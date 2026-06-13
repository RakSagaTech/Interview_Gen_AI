const mongoose = require('mongoose')


const technicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Technical question is required"],
    trim: true
  },
  intention:{
    type: String,
    required: [true, "Intention is required"],
    trim: true
  },
  answer:{
    type: String,
    required: [true, "Answer is required"],
    trim: true
  }
}, {
  _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Behavioral question is required"],
    trim: true
  },
  intention:{
    type: String,
    required: [true, "Intention is required"],
    trim: true
  },
  answer:{
    type: String,
    required: [true, "Answer is required"],
    trim: true
  }
}, {
  _id: false
})

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"],
    trim: true
  },
  severity:{
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"]
  }
}, {
  _id: false
})

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
    trim: true
  },
  tasks:[{
    type: String,
    required: [true, "Task is required"],
    trim: true
  }]
},{
  _id: false
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
    trim: true
  },
  resume: {
    type: String,
    trim: true
  },
  selfDescription: {
    type: String,
    trim: true
  },
  matchScore: {
    type: Number,
    required: [true, "Match score is required"],
    min: 0,
    max: 100
  },
  technicalQuestions: {
    type: [technicalQuestionSchema],
    default: []
  },
  behavioralQuestions: {
    type: [behavioralQuestionSchema],
    default: []
  },
  skillGaps: {
    type: [skillGapSchema],
    default: []
  },
  preparationPlan: {
    type: [preparationPlanSchema],
    default: []
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  
  title:{
    type: String,
    required: [true, "Job title is required"]
  }
},{
  timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel