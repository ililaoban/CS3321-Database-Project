import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import TicketQuery from "../component/TicketQuery";
import TrainList from "../component/TrainList";


const Home = () =>(
    <Layout>
        <Sider style={{backgroundColor:"white", }} width={"auto"} >
            <TicketQuery/>
        </Sider>
        <Content>
            <div  style={{ margin: '20px 16px 0',}}>
                <TrainList/>
            </div>

        </Content>
    </Layout>)

export default Home;
