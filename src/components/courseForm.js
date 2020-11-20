import { Card , Form,  Button, InputNumber , Select , Result , Space , Typography} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import '../index.css'

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

export const CourseForm = (props) => {

    const grades = [
            { name : 'A' , value : 5} , 
            { name : 'B+' , value : 4} , 
            { name : 'B' , value : 3} , 
            { name : 'C' , value : 2} , 
            { name : 'D' , value : 1} , 
            { name : 'E' , value : 0.5} , 
            { name : 'F' , value : 0 }
                     ]
                     
    const { editingMode , onFinish , calculator , activeCourse , previous , Id , form , setActiveCourse , isFull} = props
    const options =  grades.map((data) => {
        return(
            <option key={data.value} value={data.value} >{data.name}</option>
            )
        })
    const { Title } = Typography
    const { option } = Select
    const formTitle = editingMode ? 'Editing Mode' : 'Fill The Form Bellow'

  const onGradeChange = (value) => {
      const letter = grades.find((data) => data.value === value)
      setActiveCourse({
          ...activeCourse,
          gradePoint: value,
          gradeLetter: letter.name
      })
  }

  const onCreditChange = (value) => {
      const changedValue = parseFloat(value)
      setActiveCourse({
          ...activeCourse,
          credit: changedValue
      })
  }
  const id = isFull ? 'Table Is Full.' : Id+1
  const hider = isFull && !editingMode


    return(
       <Card title={formTitle} style={{width : 400 }} headStyle={{color : editingMode ? 'red' : '' }} >
            <Form  {...layout} name="basic" initialValues={{ remember: false }} onFinish={onFinish}  form={form}>
                <Form.Item label={editingMode ? 'Editing Number' : "Course Number" }  name="CourseId" >
                    <Title level={3}> {editingMode ? activeCourse.id : id} </Title>
                </Form.Item>
                <Form.Item label="Course Grade"  name="Grade" rules={[{ required: true, message: 'Please Select Course Grade!' }]} >
                    <Select disabled={hider} placeholder="Select Course Grade" defaultValue={activeCourse.gradeLetter} onChange={onGradeChange} allowClear >
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item label="Course Credit"  name="Credit" rules={[{ required: true, message: 'Please input Course Credit!' }]} >
                    <InputNumber  disabled={hider} style={{width : 232}}  placeholder="Enter Course Credit" min={1} max={20} value={activeCourse.credit} onChange={onCreditChange} />
                </Form.Item> <Space>
                    
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={previous}> Previous</Button>
                </Form.Item>  &nbsp;  &nbsp;  &nbsp;
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onDoubleClick={calculator} disabled={hider}> Save </Button>
                </Form.Item>
                </Space>
            </Form>
      </Card>
) }

export const TotalCourses = (props) => {
    const { totalCourses , setTotalCourses , next } = props
    return(
        <Card title="How Many Courses Do You Have ?" style={{width : 400 }}>
            <Form {...layout} name="basic" onFinish={next}>
                <Form.Item label="Total" name="total" rules={[{ required : true , message : 'Please Input Total Courses'}]}>
                    <InputNumber  style={{width : 232}}  min={1} max={20} defaultValue={totalCourses}  value={totalCourses}  onChange={setTotalCourses} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit"> Next</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export const LastStep = (props) => {
    const { previous , resetValues} = props
    return(
        <Result
    icon={<SmileOutlined />}
    status="success"
    title="Great, We Have Done All The Steps!"
    extra={
        <>
        <Button type="primary" onClick={previous}>Go Back</Button>  
        <Button type="primary" onClick={resetValues}> Go Home</Button>  
        </>
        }
  />
    )
}