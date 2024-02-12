exports.sendInformantion = () => {
  let lessProducts = [];

  Product.find()
    .then((products) => {
      const promises = [];

      products.forEach((product) => {
        promises.push(
          Product.findById(product._id).then((foundProduct) => {
            if (foundProduct.amount < 5) {
              lessProducts.push(foundProduct);
            }
          })
        );
      });

      return Promise.all(promises);
    })
    .then(() => {
      const ownerGroups = {};

      lessProducts.forEach((product) => {
        if (!ownerGroups[product.ownerId]) {
          ownerGroups[product.ownerId] = [];
        }
        ownerGroups[product.ownerId].push(product);
      });

      const ownerPromises = [];

      for (const ownerId in ownerGroups) {
        const products = ownerGroups[ownerId];
        ownerPromises.push(
          Owner.findById(ownerId).then((owner) => {
            const emailContent = products
              .map(
                (product) => `
                <h1>Product amount is low</h1>
                <p>Product name: ${product.name}</p>
                <p>Product amount: ${product.amount}</p>
              `
              )
              .join("");

            return sendMailInfoForProduct(
              owner.email,
              process.env.SENDER_MAIL,
              "Products amount is low",
              "Products amount is low",
              emailContent
            );
          })
        );
      }

      return Promise.all(ownerPromises);
    })
    .then((results) => {
      console.log("Emails sent successfully:", results);
    })
    .catch((error) => {
      console.error("Error while sending emails:", error);
    });
};
