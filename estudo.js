const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const titulo = document.querySelector('.app__title')
const alternarMusicaBt = document.querySelector('#alternar-musica')
const comecarPausarBt = document.querySelector('#start-pause')
const relogio = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervalId = null

alternarMusicaBt.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
        return
    }
    musica.pause()
    
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    mudarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
   tempoDecorridoEmSegundos = 300
   mudarContexto('descanso-curto')
   curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    mudarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function mudarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto )
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    botoes.forEach( bt => bt.classList.remove('active') )

    switch(contexto){
        case 'foco': titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
        break
        case 'descanso-curto': titulo.innerHTML = `
           Que tal dar uma respirada, <br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>
        `
        break
        case 'descanso-longo': titulo.innerHTML = `
            Hora de voltar a superfície, <br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>
        `
        break
        default: break

    }


}


comecarPausarBt.addEventListener('click', () =>{
    
    comercarOuPausar()
})

function comercarOuPausar(){
   if(intervalId == null){
        intervalId = setInterval(contagemRegressiva, 1000)
        comecarPausarBt.textContent = "Pausar"
        return
    }

    zerar()
}


function contagemRegressiva(){
    
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        alert('Tempo finalizado')
        return
    }
    
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


function zerar(){
    comecarPausarBt.textContent = "Começar"
    clearInterval(intervalId)
    intervalId = null
}

function mostrarTempo(){
    const data = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = data.toLocaleTimeString('pt-br',
        {minute: '2-digit', second: '2-digit'}
    )
    relogio.textContent = `${tempoFormatado}`
}

mostrarTempo()