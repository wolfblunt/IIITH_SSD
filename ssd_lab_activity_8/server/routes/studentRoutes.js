const Student = require('../models/StudentSchema')
const express = require('express')
const router = express.Router()

const isAlive = (req, res, next) => {
    if(req.session.user){
        next()
        return
    }
    return res.status(401).send("Unauthorized...");
}


router.use(isAlive)

router.get('/', async (req, res) => {
    try {
        const users = await Student.find();

        res.status(200).json({ "data": users })
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})


router.get('/showQuery/:roll', async (req, res) => {
    try {
        const roll = req.params.roll
        const user = await Student.find({ roll });

        if(!user){
            return res.status(200).json({ msg: "Queries doesn't exist..." })
        }

        return res.status(200).json({ "data": user })
    } catch (err) {
        return res.status(500).send("Something went wrong!")
    }
})


router.post('/addQuery', async (req, res) => {
    const { exam_name, course_name, question_num, ta_roll, roll, std_comment } = req.body;

    if (!exam_name) {
        return res.status(400).send("Exam Name is missing");
    }

    if (!course_name) {
        return res.status(400).send("Course Name is missing");
    }
    if (!question_num) {
        return res.status(400).send("Question Num is missing");
    }
    if (!ta_roll) {
        return res.status(400).send("TA RollNo is missing");
    }
    if (!roll) {
        return res.status(400).send("Roll is missing");
    }

    if (!std_comment) {
        return res.status(400).send("Student Comment is missing");
    }
    const ta_comment = "";
    const IsActive = true;
    const newStd = new Student({ exam_name, course_name, question_num, ta_roll, roll, ta_comment, std_comment, IsActive });
    const savedStd = await newStd.save();

    if (savedStd) {
        return res.status(200).json({ data: newStd })
    }
    else {
        return res.status(500).json({ msg: "Couldn't save student details" })
    }
})


router.put('/', async (req, res) => {
    const { name, roll, programme, courses } = req.body;

    if (!name || !roll || !programme) {
        return res.status(400).send("Something is missing");
    }

    const existStd = await Student.findOne({ roll });
    if (!existStd) {
        return res.status(500).json({ msg: "Student doesn't exist..." });
    }

    const std = await Student.findByIdAndUpdate(existStd.id, { name, roll, programme, courses }, { new: true })

    if (std) {
        return res.status(200).json({ data: std })
    }
    else {
        return res.status(500).json({ msg: "Couldn't update student details" })
    }
})


router.delete('/:roll', async (req, res) => {
    try {
        const roll = (req.params.roll)
        const result = await Student.findOneAndDelete({ roll })
        
        if (result) {
            res.status(200).json({ msg: "Delete Successfull" })
        }
        else {
            res.status(500).json({ msg: "Couldn't delete student" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong..." })
    }
})

module.exports = router