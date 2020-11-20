import { CourseForm , TotalCourses , LastStep} from './components/courseForm'
import { CourseResult } from './components/courseResult'
import { CourseTable } from './components/courseTable'
import React , { useState , useEffect } from 'react'
import { Space , Card , Steps , Form , message} from 'antd';
import './index.css'

let Id = 0
const App = () => {

  const [selectedCourses , setSelectedCourses ] = useState([])
  const [selectedRowKeys , setSelectedRowKeys ] = useState([])
  const [editingMode , setEditingMode ] = useState(false)
  const [activeCourse , setActiveCourse ] = useState({})
  const [totalCourses , setTotalCourses ] = useState(undefined)
  const [loading, setLoading ] = useState(false)
  const [courses , setCourses ]  = useState([])
  const [ current , setCurrent ] = useState(0)
  const [gpa , setGpa ] = useState('')
  const [form] = Form.useForm()
  const [isFull , setIsFull ] =useState(false)
  const { Step } = Steps

    const onFinish = values => {
      // e.preventDefault()
      form.resetFields()
      if(editingMode){
        const newCoursesList = courses.map((data) => {
          if(data.id === activeCourse.id){
            return {...data , gradeLetter : activeCourse.gradeLetter , gradePoint : activeCourse.gradePoint , credit : activeCourse.credit}
        }
        else {
          return data
        }})
        setCourses(newCoursesList)
        setEditingMode(false)
        calculator()
        form.setFieldsValue({  Grade : null})
      }
      else {
        Id += 1
        setCourses([...courses , {...activeCourse , key : Id , id : Id}])
      }
      setActiveCourse({})
    }
    
    const calculator = () => {
      form.resetFields()

        if(courses.length <= 0){
          setGpa('')
        }
        else{
      const product = courses.map((data) => {return data.credit * data.gradePoint})
      const sumOfProduct = product.reduce((total , data) => total = total + data )
      const credits = courses.map((data) => {return data.credit })
      const sumOfCredit = credits.reduce((total ,data) => {return total = total + data })
      const gpa1 = sumOfProduct/sumOfCredit
      setGpa(gpa1)  
    }

    if(totalCourses === courses.length) {
      // const total = parseFloat(totalCourses)
      // setCurrent(current +1)
      next()
      setIsFull(true)
    }
    // if(editingMode){
    //   setCurrent(1)
    // }
    // if(totalCourses > 0 && totalCourses !== courses.length) {
    //   setCurrent(1)
    // }
    setActiveCourse({})
      }
  
    useEffect(() => {
      calculator()
        }, [courses.length])

    const onSelectChange = (selectedRowKeys) => {
           if(current === steps.length-1) {
        message.error('Go Back And Click Again')
      }
      else {
      setSelectedRowKeys(selectedRowKeys)
      const selected = courses.filter((data) => selectedRowKeys.includes(data.key))
      const selectedIds = selected.map((data) => {return data.id})
      setSelectedCourses(selectedIds)
      }
    }

    const deleteCourses = () => {
      setLoading(true)
      setTimeout(  () => {
      const remainingCourses = courses.filter((data) => !selectedCourses.includes(data.id))
      setCourses(remainingCourses)
      console.log(courses)
      setSelectedCourses([])
      setSelectedRowKeys([])
      setLoading(false)
    } , 500)
    calculator()
    }

    const editCourseInfo = (value) => {
      if(current === steps.length-1) {
        message.error('Go Back And Click Again')
      }
      else {
        const selected = courses.find((data) => data.id === value)
        setActiveCourse(selected)
        setEditingMode(true)
        form.setFieldsValue({ Credit : selected.credit , Grade : selected.gradeLetter})
      }
        }


        const next = () => {
          setCurrent(current + 1)
            if(totalCourses !== courses.length) {
      setIsFull(false)
    }
        }
        const previous = () => {
          setCurrent(current -1)
        }
        const resetValues = () => {
          setCurrent(0)
          setEditingMode(false)
          setGpa('')
          setTotalCourses('')
          setCourses([])
        }
        const cozFom = <CourseForm isFull={isFull} previous={previous} calculator={calculator} editingMode={editingMode} onFinish={onFinish} form={form} activeCourse={activeCourse} Id={Id} setActiveCourse={setActiveCourse} />
        const totoCoz = <TotalCourses totalCourses={totalCourses} setTotalCourses={setTotalCourses} next={next} />
        const Results =  <LastStep previous={previous} resetValues={resetValues} />
        
        const steps = [
          { title : 'Total Courses' , content : totoCoz } , 
          { title : 'Course Form' , content : cozFom } ,
          { title : 'Result' , content : Results }
        ]
        const list = steps.map((item) =>  <Step key={item.title} title={item.title} />  )

    const rowSelection = {

      selectedRowKeys,
      onChange: onSelectChange,
    };
  return (
    <div className="container" >
      <Space>
        <Card>
          <div > 
          <Steps current={current}>
            {list}
           </Steps> 
           </div>
          <div > {steps[current].content} </div>
        </Card>
        <CourseTable deleteCourses={deleteCourses} selectedCourses={selectedCourses} rowSelection={rowSelection} loading={loading} editCourseInfo={editCourseInfo} courses={courses}/>
        <CourseResult gpa={gpa} totalCourses={totalCourses} />
      </Space>
    </div>
  );
};
export default App;