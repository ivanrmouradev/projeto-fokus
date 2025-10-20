const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const titulo = document.querySelector('.app__title')
const alternarMusicaBt = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const relogio = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const startAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')
const finalizacaoAudio = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervalId = null

alternarMusicaBt.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
})


function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    botoes.forEach( bt => bt.classList.remove('active') )

    switch(contexto){
        case 'foco': titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
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
        default: break;
    }

   
}

startPauseBt.addEventListener('click', () =>{
    startOuPause()
})

function startOuPause(){
    
    if(intervalId == null){
         startPauseBt.textContent = "Pausar"
         intervalId = setInterval(contagemRegressiva, 1000)
        startAudio.play()
      
        return
    }
        
    zerar()
    pauseAudio.play()
    startPauseBt.textContent = "Começar"
}


function contagemRegressiva(){
    if(tempoDecorridoEmSegundos <= 0){
        finalizacaoAudio.play()  
        zerar() 
        alert('Tempo finalizado!')
        
        return
    }
    
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    
}

function zerar(){
    clearInterval(intervalId)
    intervalId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
        minute: '2-digit',
        second: '2-digit'    
    })
    relogio.innerHTML = `${tempoFormatado}`
}

mostrarTempo()


