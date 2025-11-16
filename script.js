// ==============================
// EAT CLEAN - SCRIPT.JS (Unified)

// ------------------------------
// TOOLS.HTML: BMI, Calories & AI Gợi ý thực đơn (onclick)
// ------------------------------

// 1) Tính BMI (được gọi từ onclick trong tools.html)
function calcBMI() {
  const hInput = document.getElementById("height");
  const wInput = document.getElementById("weight");
  const out = document.getElementById("bmiResult");

  const h = parseFloat(hInput?.value) / 100;
  const w = parseFloat(wInput?.value);

  if (!h || !w) {
    alert("Vui lòng nhập đầy đủ chiều cao và cân nặng!");
    return;
  }

  const bmi = w / (h * h);
  let label = "";
  if (bmi < 18.5) label = "Thiếu cân";
  else if (bmi < 25) label = "Bình thường";
  else if (bmi < 30) label = "Thừa cân";
  else label = "Béo phì";

  if (out) out.innerHTML = `Chỉ số BMI: <b>${bmi.toFixed(1)}</b> (${label})`;
}

// 2) Tính Calories (được gọi từ onclick trong tools.html)
function calcCalories() {
  const wInput = document.getElementById("calWeight");
  const out = document.getElementById("calResult");
  const w = parseFloat(wInput?.value);
  if (!w) {
    alert("Vui lòng nhập cân nặng!");
    return;
  }
  const tdee = Math.round(22 * w);
  if (out) {
    out.textContent = `Nhu cầu calo duy trì: ${tdee} kcal/ngày. Nếu muốn giảm cân an toàn, chỉ nên nạp khoảng ${tdee - 500} kcal/ngày.`;
  }
}

// 3) AI Gợi ý thực đơn (được gọi từ onclick trong tools.html)
function generateMenu() {
  const height = parseFloat(document.getElementById("height")?.value);
  const weight = parseFloat(document.getElementById("weight")?.value);
  const goal = document.getElementById("goal")?.value;
  const menuBox = document.getElementById("menuResult");

  if (!height || !weight || !goal) {
    alert("Vui lòng nhập chiều cao, cân nặng và chọn mục tiêu!");
    return;
  }

  // Tính BMI & Calo gần đúng
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  let calories = Math.round(22 * weight);
  if (goal === "loss") calories -= 500;
  if (goal === "gain") calories += 300;

// ==========================
// Danh sách thực đơn mở rộng theo mục tiêu (ưu tiên sản phẩm Eat Clean)
// ==========================
const menus = {
  loss: [
    {
      title: "Thực đơn Giảm cân – Nhẹ nhàng Eat Clean",
      meals: [
        ["Bữa sáng", "Sữa chua Hy Lạp & Granola + Trứng luộc (2 quả)"],
        ["Bữa trưa", "Cá diêu hồng hấp nấm + salad rau xanh"],
        ["Bữa tối", "Thịt heo sốt cam + rau củ hấp"],
        ["Bữa phụ", "Nước ép Năng lượng xanh"]
      ]
    },
    {
      title: "Thực đơn Giảm cân – Gọn dáng",
      meals: [
        ["Bữa sáng", "Thanh năng lượng EATLY + sữa hạt"],
        ["Bữa trưa", "Cá hồi sốt chanh dây + cơm gạo lứt"],
        ["Bữa tối", "Ức gà luộc + salad dầu ô liu"],
        ["Bữa phụ", "Trái cây tươi + hạnh nhân"]
      ]
    },
    {
      title: "Thực đơn Giảm cân – Năng lượng sạch",
      meals: [
        ["Bữa sáng", "Yến mạch sữa hạt + chuối"],
        ["Bữa trưa", "Gà nướng sốt teriyaki + rau củ hấp"],
        ["Bữa tối", "Cá diêu hồng + soup bí đỏ"],
        ["Bữa phụ", "Nước ép Rang rỡ mỗi ngày"]
      ]
    },
    {
      title: "Thực đơn Giảm cân – Combo tiết kiệm",
      meals: [
        ["Combo đề xuất", "Combo giữ dáng toàn diện (115.000đ): 1 Combo Slim + 1 sữa chua Hy Lạp & Granola"]
      ]
    }
  ],

  maintain: [
    {
      title: "Thực đơn Giữ dáng – Cân bằng Eat Clean",
      meals: [
        ["Bữa sáng", "Ngũ cốc nguyên hạt + sữa hạt"],
        ["Bữa trưa", "Thịt bò áp chảo măng tây + cơm gạo lứt"],
        ["Bữa tối", "Salad ức gà Caesar (Meal prep)"],
        ["Bữa phụ", "Sữa chua Hy Lạp + trái cây"]
      ]
    },
    {
      title: "Thực đơn Giữ dáng – Linh hoạt",
      meals: [
        ["Bữa sáng", "Trứng luộc + bánh mì nguyên cám"],
        ["Bữa trưa", "Cá hồi sốt chanh dây + salad rau củ"],
        ["Bữa tối", "Thịt heo sốt cam + soup bí đỏ"],
        ["Bữa phụ", "Protein Power Smoothie"]
      ]
    },
    {
      title: "Thực đơn Giữ dáng – Năng động",
      meals: [
        ["Bữa sáng", "Thanh năng lượng EATLY + nước ép Rang rỡ mỗi ngày"],
        ["Bữa trưa", "Gà nướng sốt Teriyaki + salad rau củ"],
        ["Bữa tối", "Cơm gạo lứt + thịt bò + canh rau củ"],
        ["Bữa phụ", "Sữa chua Hy Lạp & Granola"]
      ]
    },
    {
      title: "Thực đơn Giữ dáng – Gói Combo",
      meals: [
        ["Combo đề xuất", "Combo giữ dáng toàn diện (115.000đ): 1 Combo Slim + 1 sữa chua Hy Lạp & Granola"]
      ]
    }
  ],

  gain: [
    {
      title: "Thực đơn Tăng cơ – Xây dựng năng lượng",
      meals: [
        ["Bữa sáng", "Trứng luộc + yến mạch + Protein Power Smoothie"],
        ["Bữa trưa", "Bò áp chảo măng tây + cơm gạo lứt"],
        ["Bữa tối", "Cá hồi sốt chanh dây + salad dầu mè"],
        ["Bữa phụ", "Thanh năng lượng EATLY"]
      ]
    },
    {
      title: "Thực đơn Tăng cơ – Thể hình Eat Clean",
      meals: [
        ["Bữa sáng", "Bánh mì bơ đậu phộng + sữa protein"],
        ["Bữa trưa", "Cơm + thịt bò + canh rau củ"],
        ["Bữa tối", "Ức gà nướng sốt Teriyaki + khoai lang"],
        ["Bữa phụ", "Sữa chua Hy Lạp + hạt điều"]
      ]
    },
    {
      title: "Thực đơn Tăng cơ – Combo đề xuất",
      meals: [
        ["Combo đề xuất", "Combo tập luyện (129.000đ): 1 Combo Build + 1 Protein Power Smoothie"]
      ]
    },
    {
      title: "Thực đơn Tăng cơ – Gói tuần năng lượng",
      meals: [
        ["Combo đề xuất", "Gói ăn tuần '5 ngày vui khỏe' (359.000đ): 5 Combo Balance cho Thứ 2 – Thứ 6"]
      ]
    }
  ]
};


  const chosen = menus[goal][Math.floor(Math.random() * menus[goal].length)];

  const html = `
    <div class="alert alert-success">
      <strong>Kết quả AI:</strong><br>
      BMI: ${bmi} | Calo khuyến nghị: ${calories} kcal/ngày
    </div>
    <h6 class="fw-bold mt-2">${chosen.title}</h6>
    <ul class="list-group mt-2">
      ${chosen.meals.map(m => `<li class="list-group-item"><strong>${m[0]}:</strong> ${m[1]}</li>`).join("")}
    </ul>
  `;

  if (menuBox) menuBox.innerHTML = html;
}
