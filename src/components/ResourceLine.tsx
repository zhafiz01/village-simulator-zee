import { useState } from "react"

const [resource, setResource] = useState([
    {id: 1, type: "People", quantity: 4},
    {id: 2, type: "Grain", quantity: 13},
    {id: 3, type: "Sheep", quantity: 4},
    {id: 4, type: "Lumber", quantity: 1},
    {id: 5, type: "Water", quantity: 9}
])

export function ResourceLine() {
    return (
        <div>
            {resource.map((resources) => (
                        <tr key={resources.id}>
                            <td>{resources.type}</td>
                            <td>{resources.quantity}</td>
                        </tr>
                    ))}
        </div>
    )
}