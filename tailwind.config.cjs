module.exports = {
        content: ["./*.html", "./*.js"],
 darkMode: "class",
        theme: {
          extend: {
            fontFamily: {
              display: ['"Playfair Display"', "serif"],
              body: ["Inter", "sans-serif"],
            },
            colors: {
              ivory: "#FAF8F4",
              cream: "#EFE7D8",
              gold: "#C8A44D",
              goldDeep: "#8B6512",
              charcoal: "#111111",
              night: "#1A1A1A",
              ink: "#2C2C2C",
              pearl: "#F5F5F5",
            },
            boxShadow: {
              luxury: "0 28px 90px rgba(17, 17, 17, 0.16)",
              gold: "0 18px 55px rgba(200, 164, 77, 0.20)",
            },
          },
        },
      }