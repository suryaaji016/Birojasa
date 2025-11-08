require("dotenv").config();
(async function () {
  const token = process.env.TEST_ADMIN_TOKEN || "";
  if (!token) {
    console.error("Set TEST_ADMIN_TOKEN in env or update the script");
    process.exit(1);
  }
  const name = "TEST_PERUSAHAAN_20251025";
  try {
    const res = await fetch("http://localhost:3000/partners", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: new URLSearchParams({ name }),
    });
    const text = await res.text();
    console.log("STATUS", res.status);
    console.log("BODY", text);
  } catch (err) {
    console.error("Request failed", err.message);
  }
})();
