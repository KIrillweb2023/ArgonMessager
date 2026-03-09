import { Aside } from "../../components/Layouts/Aside/Aside"
import { Chat } from "../../components/Layouts/Chat/Chat"
import { Description } from "../../components/Layouts/Chat/childs/Description"

export const MainPage = () => {
    return (
        <div className="flex">
            <Aside/>
            <Chat/>
            <Description/>
        </div>
    )
}