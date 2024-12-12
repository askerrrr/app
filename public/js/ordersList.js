import rowForOrders from "./services/row/rowForOrdersList.js";

async function getOrderList() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts[pathParts.length - 1];

    var response = await fetch(`/orderinfo/api/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var orders = await response.json();

    return rowForOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();

var a = {
  userId: "7413876142",
  firstName: "Test",
  userName: "",
  orders: [
    {
      order: {
        id: "636808444390",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 11111111111,
        date: "12.12.2024 - 19:49:49 ",
        orderStatus: "in-processing:1",
        file: {
          path: "/var/www/userFiles/7413876142/docs/636808444390.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_317.XLSX",
        },
      },
    },
    {
      order: {
        id: "636808444390",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 11111111111,
        date: "12.12.2024 - 19:49:49 ",
        orderStatus: "purchased:2",
        file: {
          path: "/var/www/userFiles/7413876142/docs/636808444390.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_317.XLSX",
        },
      },
    },
    {
      order: {
        id: "636808444390",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 11111111111,
        date: "12.12.2024 - 19:49:49 ",
        orderStatus: "china-warehouse:3",
        file: {
          path: "/var/www/userFiles/7413876142/docs/636808444390.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_317.XLSX",
        },
      },
    },
    {
      order: {
        id: "636808444390",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 11111111111,
        date: "12.12.2024 - 19:49:49 ",
        orderStatus: "on-the-way:4",
        file: {
          path: "/var/www/userFiles/7413876142/docs/636808444390.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_317.XLSX",
        },
      },
    },
    {
      order: {
        id: "636808444390",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 11111111111,
        date: "12.12.2024 - 19:49:49 ",
        orderStatus: "awaiting-receipt:5",
        file: {
          path: "/var/www/userFiles/7413876142/docs/636808444390.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_317.XLSX",
        },
      },
    },
    {
      order: {
        id: "336416459900",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 22222222222,
        date: "12.12.2024 - 19:51:57 ",
        orderStatus: "order-is-completed:6",
        file: {
          path: "/var/www/userFiles/7413876142/docs/336416459900.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_318.xlsx",
        },
      },
    },
    {
      order: {
        id: "336416459900",
        userId: "7413876142",
        firstName: "Test",
        userName: "",
        phone: 22222222222,
        date: "12.12.2024 - 19:51:57 ",
        orderStatus: "not-accepted-for-processing:0",
        file: {
          path: "/var/www/userFiles/7413876142/docs/336416459900.xlsx",
          telegramApiFileUrl:
            "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9U                                                                                                                                       eu04NjTLGk/documents/file_318.xlsx",
        },
      },
    },
  ],
};
