const { validationResult, body } = require("express-validator");

const validate_attribut = (fields) => {
  const validations = fields
    .map((field) => {
      switch (field) {
        case "Name":
          return body("Name")
            .notEmpty()
            .withMessage("Le nom ne doit pas être vide")
            .isLength({ min: 3 })
            .withMessage("Le nom doit contenir au moins 3 caractères");
        case "description":
          return body("description")
             .optional()
            .isLength({ min: 8 })
            .withMessage("Le champ doit conteir au moins 8 caractères");
        case "price":
          return body("price")
            .notEmpty()
            .isFloat({ gt: 0 })
            .withMessage("Le prix ne doit pas etre vide");
        case "qte":
          return body("qte")
            .notEmpty()
            .isFloat({ gt: 0 })
            .withMessage("La quntité ne doit pas etre vide ");
        case "ref":
          return body("ref")
            .notEmpty()
            .withMessage("La ref ne doit pas etre vide")
            .isLength({ min: 8 })
            .withMessage("La ref doit contenir au moins 8 caractères");
        case "image":
          return body("image")
            
            .custom((value, { req }) => {
              if (!req.file) {
                throw new Error("L'image est obligatoire");
              }
              return true;
            });
        case "gallery":
          return body("gallery")
            .optional()
            .isArray()
            .withMessage("Galleries doit être un tableau")
            .custom((gallery) => {
              const invalidUrls = gallery.filter(
                (url) => !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url)
              );
              if (invalidUrls.length > 0) {
                throw new Error(
                  "Toutes les images doivent être des URLs valides"
                );
              }
              return true;
            });
        default:
          return null;
      }
    })
    .filter(Boolean);

  return [
    ...validations,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json
        ({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = validate_attribut;
