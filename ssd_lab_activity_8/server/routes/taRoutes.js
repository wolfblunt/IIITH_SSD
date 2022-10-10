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
        const ta_roll = req.params.roll
        const user = await Student.find({ ta_roll });

        if(!user){
            return res.status(200).json({ msg: "Queries doesn't exist..." })
        }

        return res.status(200).json({ "data": user })
    } catch (err) {
        return res.status(500).send("Something went wrong!")
    }
})


router.post('/updateQuery', async (req, res) => {
    const { roll, ta_roll, ta_comment, exam_name, course_name, question_num } = req.body;
    console.log("TAComment : ", ta_comment);
    if (!ta_comment || !roll || !ta_roll || !exam_name || !course_name || !question_num) {
        return res.status(400).send("TA Comment is missing");
    }
    const query = { roll: roll, ta_roll: ta_roll, course_name: course_name};
    const existStd = await Student.findOne({ query });
    console.log("existStd : ",existStd);
    if (!existStd) {
        return res.status(500).json({ msg: "Student doesn't exist..." });
    }
    const IsActive = false;
    const savedStd = await Student.findOneAndUpdate(query, { ta_comment:ta_comment, IsActive:IsActive})
    // const savedStd = await Student.findByIdAndUpdate(existStd.id, { ta_comment, IsActive}, { new: true })
    // var myquery = { roll: roll, ta_roll:ta_roll, exam_name:exam_name, course_name:course_name, question_num:question_num };
    // var newvalues = { $set: {ta_comment: ta_comment, IsActive: IsActive } };
    // var newvalues = { $set: {ta_roll: ta_roll, ta_comment: ta_comment } };
    // const newStd = new Student({ exam_name, course_name, question_num, ta_roll, roll, ta_comment, std_comment, IsActive });
    // const savedStd = await newStd.updateOne(myquery, newvalues);

    if (savedStd) {
        console.log("Data Saved Successfully");
        return res.status(200).json({ data: "Comment Saved Successfully" })
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