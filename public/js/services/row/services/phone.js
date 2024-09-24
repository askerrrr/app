export default function getPhone(data) {
  const phone = document.createElement("td");
  phone.append(data.order.phone);
  return phone;
}
