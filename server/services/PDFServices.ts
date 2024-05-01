import puppeteer, { PDFOptions } from "puppeteer";

const defaultOptions: PDFOptions = {
  format: "A4",
  printBackground: true,
  margin: {
    top: "20px",
    bottom: "40px",
    left: "20px",
    right: "20px",
  },
};

export class PDFServices {
  async htmlToPdf(html: string, options = defaultOptions) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(
        `<html> <head> <script src="https://cdn.tailwindcss.com"></script>
        </head> <body> ${html} </body> </html>`
      );
      const pdfBuffer = await page.pdf(options);
      await browser.close();
      return pdfBuffer;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
