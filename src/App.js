import { Card , Table , Form, Input, Button, Checkbox , InputNumber , Select , List , Spin , Space , Typography} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React , { useState, usestate } from 'react'
import './index.css'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 20,
    span: 16
  },
};

let Id = 0
const App = () => {
  
  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'id',
    },
    {
      title: 'Grade ',
      dataIndex: 'gradeLetter',
    },
    {
      title: 'Grade Value ',
      dataIndex: 'gradePoint',
    },
    {
      title: 'Course Credit',
      dataIndex: 'credit',
    },
  ];

    const initialGrades = [
    { name : 'A' , value : 5} , 
    { name : 'B+' , value : 4} , 
    { name : 'B' , value : 3} , 
    { name : 'C' , value : 2} , 
    { name : 'D' , value : 1} , 
    { name : 'E' , value : 0.5} , 
    { name : 'F' , value : 0 }
  ]
  const initialCourses = [
    { key : 1 , id : 1 , gradePoint : 2 , gradeLetter : 'C', credit : 10},
    { key : 2 , id : 2 , gradePoint : 5 , gradeLetter : 'A' , credit : 7},
            ]
  const course = { id : '' , gradePoint : 'gp' , gradeLetter : 'gl' , credit : 'cr'}
  const [grades , setGrades ] = useState(initialGrades)
  const [courses , setCourses ]  = useState([])
  const [gpa , setGpa ] = useState('')
  const [selectedRowKeys , setSelectedRowKeys ] = useState([])
  const [editingMode , setEditingMode ] = useState(false)
  const [activeCourse , setActiveCourse ] = useState(course)

  const { Title } = Typography
  const { option } = Select
  let id = courses.length
  const options =  grades.map((data) => {
    return(
      <option key={data.value} value={data.value} >{data.name}</option>
      )
    })
    
    const onFinish = values => {
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
      }
      else {

        Id += 1
        setCourses([...courses , {...activeCourse , key : Id , id : Id}])
      }
    };

      const calculator = () => {
        console.log('size ' + id)
      const product = courses.map((data) => {return data.credit * data.gradePoint})
      console.log('product '+ product)
      const sumOfProduct = product.reduce((total , data) => total = total + data )
      console.log('sop ' + sumOfProduct)
      const credits = courses.map((data) => {return data.credit })
      const sumOfCredit = credits.reduce((total ,data) => {return total = total + data })
      console.log('totalCredit ' + sumOfCredit)
      const gpa1 = sumOfProduct/sumOfCredit
      console.log('gpa ' + gpa1.toFixed(1))
      setGpa(gpa1)  
      console.log(courses.length)

      }
    
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const onGradeChange = (value) => {
      const letter = initialGrades.find((data) => data.value === value)
      setActiveCourse({...activeCourse , gradePoint : value , gradeLetter : letter.name})
    }
    const onCreditChange = (value) => {
      const changedValue = parseFloat(value)
      setActiveCourse({...activeCourse , credit : changedValue})
    }

    const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      console.log(setSelectedRowKeys.length)
    }
    const editCourseInfo = (value) => {
      const selecte = courses.find((data) => data.id === value)
      setActiveCourse(selecte)
      setEditingMode(true)
      console.log('coz ni ' + activeCourse.gradeLetter)
      console.log('id ni ' + activeCourse.id)
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const spinner = <Spin tip="Waiting For Data To Calculate GPA" indicator={antIcon} />

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

  return (

    <div className="container" >
    <Space>
      <Card title="Fill The Form Bellow" style={{width : 400}} >
        <Form
          {...layout}
          name="basic"
          // initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
            
            <Form.Item label="Course Id"  name="CourseId" >
              <label>{editingMode ? activeCourse.id : id +1}</label>
            </Form.Item>
            <Form.Item label="Course Grade"  name="Course Grade" rules={[{ required: true, message: 'Please Select Course Grade!' }]} >
              <Select placeholder="Select Course Grade" defaultValue={activeCourse.gradeLetter} onChange={onGradeChange} allowClear >
                {options}
              </Select>
            </Form.Item>
            <Form.Item label="Course Credit"  name="Course Credit" rules={[{ required: true, message: 'Please input Course Credit!' }]} >
              <InputNumber style={{width : 232}} placeholder="Enter Course Credit" min={1} max={20} defaultValue={activeCourse.credit} onChange={onCreditChange} />
            </Form.Item>
            <Form.Item {...tailLayout}>
               <Button type="primary" htmlType="submit" onMouseLeave={calculator}> Save </Button>
            </Form.Item>
        </Form>
    
      </Card>

      <Card title="Courses Info" style={{width : 700}} >
        <Table rowSelection={rowSelection} columns={columns} dataSource={courses} onRow={(record, rowIndex) => {
    return {
      onClick: event => {editCourseInfo(record.id)} }; }}/>
      </Card>

      <Card title="Result" style={{width : 300}} >
        <Title level={2}>{gpa ? 'Your GPA Is : ' + gpa.toFixed(1) : spinner } </Title>
        <Title leve={4}>{activeCourse.id} - {activeCourse.gradeLetter} - {activeCourse.gradePoint} - {activeCourse.credit}</Title>
      </Card>

      </Space>
    </div>
  );
};
export default App;