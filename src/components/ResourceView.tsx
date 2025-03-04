import { useState } from "react"
import { ResourceLine } from "./ResourceLine"
import "../ResourceView.sass"

const ResourceView = () => {
    const [resource, setResource] = useState([
        {id: 1, type: "People", quantity: 4},
        {id: 2, type: "Grain", quantity: 13},
        {id: 3, type: "Sheep", quantity: 4},
        {id: 4, type: "Lumber", quantity: 1},
        {id: 5, type: "Water", quantity: 9}
    ])

    return (
        <div className="resourceView">
            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Availiable</th>
                    </tr>
                </thead>
                <tbody>
                    {resource.map((resources) => (
                        <tr key={resources.id}>
                            <td>{resources.type}</td>
                            <td>{resources.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResourceView