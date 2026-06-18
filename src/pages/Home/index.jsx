import Barchart from "@/pages/Home/components/Barchart";


const Home = () => {

  return (
    <div>
      <Barchart title='三大框架满意度' legends='满意度'/>
      <Barchart title='三大框架使用度' legends='使用度'/>
    </div>
  )
}

export default Home