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

  // Danh sách thực đơn ngẫu nhiên theo mục tiêu
  const menus = {
    loss: [
      {
        title: "Thực đơn Giảm cân – Nhẹ nhàng",
        meals: [
          ["Bữa sáng", "Yến mạch + sữa hạt + chuối"],
          ["Bữa trưa", "Ức gà luộc + salad dầu ô liu"],
          ["Bữa tối", "Cá hấp + rau củ + soup bí đỏ"],
          ["Bữa phụ", "Sữa chua không đường + hạnh nhân"]
        ]
      },
      {
        title: "Thực đơn Giảm cân – Năng động",
        meals: [
          ["Bữa sáng", "Smoothie xanh (rau + táo + chuối)"],
          ["Bữa trưa", "Cơm gạo lứt + cá hồi + rau luộc"],
          ["Bữa tối", "Ức gà áp chảo + salad cà chua"],
          ["Bữa phụ", "Táo + 5 hạt óc chó"]
        ]
      },
      {
        title: "Thực đơn Giảm cân – Ăn chậm sống khỏe",
        meals: [
          ["Bữa sáng", "Bánh yến mạch chuối + trà gừng"],
          ["Bữa trưa", "Thịt nạc + bông cải + cơm gạo lứt"],
          ["Bữa tối", "Đậu hũ sốt nấm + rau xanh luộc"],
          ["Bữa phụ", "Sữa hạt không đường"]
        ]
      }
    ],
    maintain: [
      {
        title: "Thực đơn Giữ dáng – Cân bằng",
        meals: [
          ["Bữa sáng", "Bánh mì nguyên cám + trứng + cà chua"],
          ["Bữa trưa", "Cơm gạo lứt + cá thu + rau xào"],
          ["Bữa tối", "Salad bò + khoai lang"],
          ["Bữa phụ", "Sữa chua Hy Lạp + trái cây"]
        ]
      },
      {
        title: "Thực đơn Giữ dáng – Linh hoạt",
        meals: [
          ["Bữa sáng", "Ngũ cốc nguyên hạt + sữa hạt"],
          ["Bữa trưa", "Ức gà nướng + cơm + rau trộn"],
          ["Bữa tối", "Cá hồi áp chảo + salad dầu mè"],
          ["Bữa phụ", "Chuối + hạt hướng dương"]
        ]
      },
      {
        title: "Thực đơn Giữ dáng – Năng lượng",
        meals: [
          ["Bữa sáng", "Trứng luộc + bánh mì nguyên cám"],
          ["Bữa trưa", "Cơm + thịt bò + canh rau củ"],
          ["Bữa tối", "Salad trộn + soup bí đỏ"],
          ["Bữa phụ", "Trái cây tươi + hạnh nhân"]
        ]
      }
    ],
    gain: [
      {
        title: "Thực đơn Tăng cơ – Dinh dưỡng cao",
        meals: [
          ["Bữa sáng", "Trứng + yến mạch + sữa protein"],
          ["Bữa trưa", "Cơm + ức gà + trứng luộc + rau củ"],
          ["Bữa tối", "Thịt bò + khoai lang + salad trộn"],
          ["Bữa phụ", "Sữa chua Hy Lạp + hạt óc chó"]
        ]
      },
      {
        title: "Thực đơn Tăng cơ – Thể hình",
        meals: [
          ["Bữa sáng", "Sinh tố protein + bánh yến mạch"],
          ["Bữa trưa", "Cơm gạo lứt + cá hồi + rau củ hấp"],
          ["Bữa tối", "Ức gà nướng + khoai tây + trứng"],
          ["Bữa phụ", "Trứng luộc + chuối"]
        ]
      },
      {
        title: "Thực đơn Tăng cơ – Tối ưu năng lượng",
        meals: [
          ["Bữa sáng", "Bánh mì bơ đậu phộng + sữa protein"],
          ["Bữa trưa", "Cơm + thịt bò + canh rau củ"],
          ["Bữa tối", "Cá hồi + khoai lang + rau luộc"],
          ["Bữa phụ", "Sữa chua Hy Lạp + hạt điều"]
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
