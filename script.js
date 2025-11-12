// BMI tool
function calcBMI() {
  const h = parseFloat(document.getElementById("height").value) / 100;
  const w = parseFloat(document.getElementById("weight").value);
  if (!h || !w) return alert("Vui lòng nhập đầy đủ thông tin!");
  const bmi = (w / (h * h)).toFixed(1);
  let msg = "";
  if (bmi < 18.5) msg = "Gầy";
  else if (bmi < 24.9) msg = "Bình thường";
  else if (bmi < 29.9) msg = "Thừa cân";
  else msg = "Béo phì";
  document.getElementById("bmiResult").innerText = `Chỉ số BMI của bạn: ${bmi} (${msg})`;
}

// Calories tool
function calcCalories() {
  const w = parseFloat(document.getElementById("calWeight").value);
  if (!w) return alert("Nhập cân nặng của bạn!");
  const tdee = Math.round(22 * w);
  document.getElementById("calResult").innerText =
    `Nhu cầu calo duy trì: ${tdee} kcal/ngày. Nếu muốn giảm cân an toàn, chỉ nên nạp khoảng ${tdee - 500} kcal/ngày.`;
}

// 🧠 AI Gợi ý thực đơn ngẫu nhiên
function generateMenu() {
  const goal = document.getElementById("goal").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  if (!goal || !height || !weight) return alert("Vui lòng nhập đầy đủ chiều cao, cân nặng và chọn mục tiêu!");

  // Tính toán cơ bản
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  const baseCalories = Math.round(22 * weight);
  let targetCalories = baseCalories;

  // Danh sách thực đơn mẫu
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

  // Tùy chỉnh theo mục tiêu
  if (goal === "loss") targetCalories -= 500;
  else if (goal === "gain") targetCalories += 300;

  // Chọn ngẫu nhiên thực đơn trong nhóm
  const chosenMenu = menus[goal][Math.floor(Math.random() * menus[goal].length)];

  // Hiển thị kết quả
  let html = `<div class="alert alert-success">
      <strong>Kết quả AI:</strong><br>
      BMI: ${bmi} | Calo khuyến nghị: ${targetCalories} kcal/ngày
    </div>
    <h6 class="fw-bold mt-3">${chosenMenu.title}</h6>
    <ul class="list-group mt-2">`;
  chosenMenu.meals.forEach(m => html += `<li class="list-group-item"><strong>${m[0]}:</strong> ${m[1]}</li>`);
  html += "</ul>";

  document.getElementById("menuResult").innerHTML = html;
}
