import { NextResponse } from "next/server";
import { generatePDF } from "@/lib/reportGenerator"; // Function to create report

export async function POST(req: Request) {
  try {
    const { selectedOptions, timeRange } = await req.json();

    // Generate the report file (PDF/CSV)
    const pdfBuffer = await generatePDF(selectedOptions, timeRange);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
