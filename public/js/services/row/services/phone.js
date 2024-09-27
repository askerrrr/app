export default function getPhone(data) {
  const phone = document.createElement("td");
  phone.append(data.orderContent.phone);
  return phone;
}
