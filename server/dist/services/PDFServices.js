"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFServices = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const defaultOptions = {
    format: "A4",
    printBackground: true,
    margin: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px",
    },
};
class PDFServices {
    async htmlToPdf(html, options = defaultOptions) {
        try {
            const browser = await puppeteer_1.default.launch();
            const page = await browser.newPage();
            await page.setContent(`<html> <head> <script src="https://cdn.tailwindcss.com"></script>
        </head> <body> ${html} </body> </html>`);
            const pdfBuffer = await page.pdf(options);
            await browser.close();
            return pdfBuffer;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.PDFServices = PDFServices;
//# sourceMappingURL=PDFServices.js.map