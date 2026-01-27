// Debug script to test the image mapping logic
const testData = {
    "السؤال": "الرسم البياني يوضح عدد العاملين",
    "الاختيار الأول": "اكبر من عدد الاطباء",
    "الاختيار الثاني": "اقل من عدد الممرضين",
    "الاختيار الثالث": "يساوي عدد الممرضين",
    "الاختيار الرابع": "اكبر من عدد الممرضين",
    "الاختيار الصحيح": "اقل من عدد الممرضين",
    "صورة السؤال": "https://drive.google.com/file/d/1L3JFW2o9zVHBEj0pZDrYKkZcBUjlyYdT/view?usp=sharing"
};

function getDirectImageUrl(url) {
    if (!url) return "";
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
}

function mapRowToQuestion(row, index) {
    const text = String(row["السؤال"] ?? "").trim();

    const options = [
        row["الاختيار الأول"],
        row["الاختيار الثاني"],
        row["الاختيار الثالث"],
        row["الاختيار الرابع"],
    ].map(v => String(v ?? "").trim()).filter(Boolean);

    const correct = String(row["الاختيار الصحيح"] ?? "").trim();

    // جلب رابط الصورة بشكل أكثر ذكاءً
    const keys = Object.keys(row);
    console.log("Keys:", keys);

    // البحث عن مفتاح يحتوي على "صورة" أو "image"
    const imageKey = keys.find(k => k.includes("صورة") || k.toLowerCase().includes("image"));
    console.log("Image key found:", imageKey);

    let imageUrl;
    if (imageKey) {
        const value = String(row[imageKey] ?? "").trim();
        console.log("Image value:", value);
        if (value.startsWith("http")) {
            imageUrl = getDirectImageUrl(value);
            console.log("Direct URL:", imageUrl);
        }
    }

    // إذا لم يجد المفتاح، يحاول مع آخر عمود كخيار احتياطي
    if (!imageUrl) {
        const lastKey = keys[keys.length - 1];
        const lastValue = String(row[lastKey] ?? "").trim();
        console.log("Last key fallback:", lastKey, "→", lastValue);
        if (lastValue.startsWith("http")) {
            imageUrl = getDirectImageUrl(lastValue);
        }
    }

    return {
        id: String(index + 1),
        text,
        options,
        correct,
        imageUrl,
    };
}

console.log("=== Testing with sample data ===");
const result = mapRowToQuestion(testData, 0);
console.log("\n=== Result ===");
console.log(JSON.stringify(result, null, 2));
