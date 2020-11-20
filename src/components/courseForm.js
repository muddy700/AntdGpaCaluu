import { Card , Form,  Button, InputNumber , Select , Typography} from 'antd';
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
                     
    const { editingMode , onFinish , calculator , activeCourse , Id , form , setActiveCourse } = props
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

    return(
       <Card title={formTitle} style={{width : 400 }} headStyle={{color : editingMode ? 'red' : '' }} >
            <Form  {...layout} name="basic" initialValues={{ remember: false }} onFinish={onFinish}  form={form}>
                <Form.Item label={editingMode ? 'Editing Number' : "Course Number" }  name="CourseId" >
                    <Title level={3}> {editingMode ? activeCourse.id : Id +1} </Title>
                </Form.Item>
                <Form.Item label="Course Grade"  name="Grade" rules={[{ required: true, message: 'Please Select Course Grade!' }]} >
                    <Select placeholder="Select Course Grade" defaultValue={activeCourse.gradeLetter} onChange={onGradeChange} allowClear >
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item label="Course Credit"  name="Credit" rules={[{ required: true, message: 'Please input Course Credit!' }]} >
                    <InputNumber   style={{width : 232}}  placeholder="Enter Course Credit" min={1} max={20} defaultValue="" value={activeCourse.credit} onChange={onCreditChange} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onDoubleClick={calculator}> Save </Button>
                </Form.Item>
            </Form>
      </Card>
) }