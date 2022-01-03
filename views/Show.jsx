const React = require('react')
const Default = require('./layout/Default')

function Show({bread}){
    return (
        <Default>
            <h2>SHOW PAGE</h2>
            <h3>{bread.name}</h3>
            <p>
                and it  
                {
                    bread.hasGluten ? <span> does </span> : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name}></img>
            <p>{bread.getBakedBy()}</p>
            <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
            <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE"/>
            </form>
            <a href="/breads"><button>Go Home</button></a>
        </Default>
    )
}

module.exports = Show