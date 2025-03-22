const SHEET_ID = "1F478zb2ipoi2R6rQVCJEHxKZETrw-Dh7JB4_c1nTgBE";
const SHEET_NAME = "Form%20Responses%201";
const API_KEY = "AIzaSyDdncgQkirfeSfeYIkO-fL_e0okQDB54IY";



export const fetchEvents = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:R?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // แปลงข้อมูลจาก Array เป็น Object โดยดึงเฉพาะแถวที่มีข้อมูล
        const rows = data.values;
        if (!rows || rows.length < 2) return [];

        return rows.slice(1).map((row, index) => ({
            id: index + 1,  // สร้าง ID สำหรับแต่ละอีเวนต์
            DataUpdater: row[1] || "",
            title: row[2] || "",  // ชื่ออีเว้นต์
            description: row[3] || "", // รายละเอียด
            date: formatDate(row[4] || ""), // วันที่เริ่ม
            time: row[5] || "", // เวลาเริ่ม
            enddate: formatDate(row[6] || ""), //วันที่สิ้นสุด
            endtime: row[7] || "", // เวลาสิ้นสุด
            duration: row[8] || "", // ระยะเวลาEvent
            location: row[9] || "", // สถานที่
            category: row[10] || "", // ประเภท
            organizer: row[11] || "", // ผู้จัด
            participate: row[12] || "", // Who can Participate
            dressCode: row[13] || "", // Dress Code
            evLink: row[14] || "", // Linkของเว็บไซต์Event
            socialMedia: row[15] || "", // ชื่อ Social Media เช่น Facebook หรือ Ig
            image: row[16] || "", // URL รูปภาพ
            bg: row[16] || "", // URL พื้นหลัง


        }));

    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

// สร้างฟังก์ชันให้รองรับการดึงข้อมูลอีเวนต์เฉพาะ
export async function fetchEventById(id) {
    try {
        const events = await fetchEvents();
        const event = events.find(event => event.id === id || event.id === parseInt(id));

        if (!event) {
            throw new Error(`Event with id ${id} not found`);
        }

        return event;
    } catch (error) {
        console.error(`Error fetching event with id ${id}:`, error);
        throw error;
    }
}

// ฟังก์ชันช่วยในการ format วันที่ให้สวยงาม
function formatDate(dateString) {
    if (!dateString) return "";

    try {
        // กรณี format เป็น MM/DD/YYYY (Google Sheets มักให้ format แบบนี้)
        const parts = dateString.split('/');
        if (parts.length === 3) {
            // แปลงเป็น YYYY-MM-DD เพื่อให้ JavaScript parse ได้ง่าย
            const year = parts[2];
            const month = parts[0].padStart(2, '0');
            const day = parts[1].padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return dateString; // คืนค่าเดิมหากไม่สามารถ format ได้
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
    }
}