import { useCallback } from "react";

const useHtmlToPdf = () => {
  const generatePdf = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" nahi mila.`);
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      `width=820,height=600,resizable=yes`
    );
    if (!printWindow) {
      console.error("New window open nahi ho pa rahi.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            /* Styles as before */
            html, body {
              margin: 0; padding: 0; overflow: hidden;
              background: white;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              color: #1F2937;
              padding: 10px 20px;
            }
              @page{
                margin: 10px 0;
              }
            /* rest of your styles */
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    const interval = setInterval(() => {
      if (printWindow.document.readyState === "complete") {
        clearInterval(interval);
        const body = printWindow.document.body;
        const html = printWindow.document.documentElement;
        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        printWindow.resizeTo(840, height + 40);
        printWindow.focus(); // remove this line
        printWindow.print(); // remove this line
      }
    }, 100);

    // Remove printWindow.onafterprint as no print is triggered
  }, []);

  return { generatePdf };
};

export default useHtmlToPdf;
