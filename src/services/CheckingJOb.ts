import cron from "node-cron";
import axios from "axios";
import MonitoringLogService from "../repository/monitoringLogs";
import NotificationService from "../repository/notification";
import MonitoredWebsiteService from "../repository/website";

async function checkWebsites() {
    console.log("🔍 Running website monitoring job...");

    try {
    
        const websites = await MonitoredWebsiteService.getAllWebsite();

        for (const website of websites) {
            let status = "Offline";  
            const checkedAt = new Date().toISOString();  

            try {
            
                const response = await axios.get(website.url, { timeout: 5000 });

                if (response.status >= 200 && response.status < 400) {
                    console.log(`✅ ${website.url} is UP`);
                    status = "Online";
                } else {
                    console.log(`❌ ${website.url} is DOWN (status: ${response.status})`);
                }
            } catch (error: any) {
                console.log(`❌ ${website.url} is DOWN (error: ${error.message})`);
            }


            await MonitoringLogService.createMonitoringLog(website.id, status);

            
            await MonitoredWebsiteService.updateWebsiteStatus(website.id, status, checkedAt);

            
            if (status === "Offline") {
                await NotificationService.createNotification(
                    website.user_id,
                    website.id,
                    "ALERT",
                    `⚠️ Your website ${website.url} is down! Last checked at ${checkedAt}.`
                );
            }
        }
    } catch (error) {
        console.error("❌ Error fetching websites:", error);
    }
}


cron.schedule("*/5 * * * *", () => {
    checkWebsites();
    console.log("⏳ Website monitoring job scheduled...");
});

checkWebsites();

export default checkWebsites;
