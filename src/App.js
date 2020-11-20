import { CourseResult } from './components/courseResult'
import { CourseTable } from './components/courseTable'
import { CourseForm } from './components/courseForm'
import React , { useState , useEffect } from 'react'
import { Form, Space , Affix } from 'antd';
import './index.css'

let Id = 0
const App = () => {

  const [courses , setCourses ]  = useState([])
  const [gpa , setGpa ] = useState('')
  const [selectedRowKeys , setSelectedRowKeys ] = useState([])
  const [editingMode , setEditingMode ] = useState(false)
  const [activeCourse , setActiveCourse ] = useState({})
  const [selectedCourses , setSelectedCourses ] = useState([])
  const [loading, setLoading ] = useState(false)
  const [form] = Form.useForm()
  const [top, setTop] = useState(10);


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
    setActiveCourse({})
      }
  
    useEffect(() => {
      calculator()
        }, [courses.length])

    const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      const selected = courses.filter((data) => selectedRowKeys.includes(data.key))
      const selectedIds = selected.map((data) => {return data.id})
      setSelectedCourses(selectedIds)
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
      const selected = courses.find((data) => data.id === value)
      setActiveCourse(selected)
      setEditingMode(true)
      form.setFieldsValue({ Credit : selected.credit , Grade : selected.gradeLetter})
        }

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

  return (
    <div className="container" >
      <Space>

        <Affix offsetTop={0}>
          <CourseForm calculator={calculator} editingMode={editingMode} onFinish={onFinish} form={form}activeCourse={activeCourse} Id={Id} setActiveCourse={setActiveCourse} />
        </Affix>
        <CourseTable deleteCourses={deleteCourses} selectedCourses={selectedCourses} rowSelection={rowSelection} loading={loading} editCourseInfo={editCourseInfo} courses={courses}/>
        <CourseResult gpa={gpa} />
      </Space>
    </div>
  );
};
export default App;