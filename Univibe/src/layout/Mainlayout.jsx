import Content from "../component/Content/Content";
import Nav from "../component/Nav/Nav";
import Promote from "../component/Promote/Promote";

function Mainlayout() {
  return (
  <section id = "main-layout">
    <Nav></Nav>
    <Promote></Promote>
    <Content></Content>
  </section>);
}
export default Mainlayout