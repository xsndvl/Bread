const React = require('react')
const Default = require('./layout/Default')

function Show ({baker}) {
    return (
        <Default>
            <h3>Breads {baker.name} has baked</h3>
            <ul>
                {
                    baker.breads.map((bread)=> {
                        return (
                            <li key={bread.id}>
                                {bread.name}
                            </li>
                        )
                    })
                }
            </ul>
            <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
            <p>About {baker.name}: {baker.bio}</p>

            <form action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE" />
            </form>
            
        </Default>
    )
}

module.exports = Show
