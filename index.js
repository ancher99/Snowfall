document.addEventListener('click', e=>{
    
    if(e.target.tagName  ==='P' ){
        console.log(e.target.tagName)
        route(e);
    }
    e.preventDefault()
})

const route =() =>{
    window.history.pushState({},'',e.target.href);
    handleLocation();
}
const routers={
    '/':'Main.html',
    '/play':'play.html',
    '/rules':'rules.html'
}

