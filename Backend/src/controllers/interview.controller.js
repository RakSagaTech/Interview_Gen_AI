const pdfParse = require('pdf-parse')
const interviewReportModel = require('../models/interviewReport.model')
const generateInterviewReport = require('../services/ai.service')

async function generateInterviewReportController(req, res){
  const resumeFile = req.file 

  const resumeContent = (new pdfParse.PDFParse(resumeFile.buffer)).getText()
  const {selfDescription, jobDescription} = req.body

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text, selfDescription, jobDescription
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAI
  })

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport
  })

}

module.exports = { generateInterviewReportController }