
// Assignment 3: Interactive Blacksmith

// PLAN:
// I will select the forge controls and display elements.
// I will connect each button to its function.
// I will check that the heat input is a positive whole number.
// I will update the forge after each action.
// I will allow the player to reset the forge.

// 1. Select the forge and display elements.

const forge = document.getElementById("forge")
const heatText = document.getElementById("heat-value")
const swordCountText = document.getElementById("sword-count")
const forgeStatus = document.getElementById("forge-status")
const forgeImage = document.getElementById("forge-image")
const messageText = document.getElementById("action-message")

// 2. Select the new control elements.

const heatInput = document.getElementById("heat-input")
const addHeatButton = document.getElementById("add-heat")
const makeSwordButton = document.getElementById("make-sword")
const resetButton = document.getElementById("reset-forge")

// 3. Create the state variables.

let heat = 20
let swordsMade = 0

// 4. Return the correct forge status.

function getForgeStatus(heatValue) {
    if (heatValue < 30) {
        return "Too cold to craft"
    } else if (heatValue < 70) {
        return "Ready to forge"
    } else {
        return "Roaring fire. Keep crafting!"
    }
}

// 5. Update the forge display.

function updateForge() {
    const status = getForgeStatus(heat)

    forgeStatus.textContent = status
    heatText.textContent = heat
    swordCountText.textContent = swordsMade

    forge.classList.remove("is-cold", "is-ready", "is-roaring")

    if (heat < 30) {
        forge.classList.add("is-cold")
        forgeImage.setAttribute("src", "assets/forge-cold.svg")
        forgeImage.setAttribute("alt", "A stone forge with dark coals and no flames")
    } else if (heat < 70) {
        forge.classList.add("is-ready")
        forgeImage.setAttribute("src", "assets/forge-ready.svg")
        forgeImage.setAttribute("alt", "A stone forge with a small orange fire")
    } else {
        forge.classList.add("is-roaring")
        forgeImage.setAttribute("src", "assets/forge-roaring.svg")
        forgeImage.setAttribute("alt", "A stone forge with tall bright flames and sparks")
    }
}

// 6. Reset the forge and clear the controls.

function resetForge() {
    heat = 20
    swordsMade = 0
    heatInput.value = ""
    messageText.textContent = ""
    updateForge()
}

// 7. Add heat to the forge.

function heatForge(amount) {
    heat = heat + amount

    if (heat > 100) {
        heat = 100
    }

    messageText.textContent = "Heating complete. The forge is at " + heat + " heat."
    updateForge()
}

// 8. Make a sword if there is enough heat.

function makeSword() {
    if (heat >= 30) {
        heat = heat - 30
        swordsMade = swordsMade + 1
        messageText.textContent = "Sword successfully crafted!"
    } else {
        messageText.textContent = "Not enough heat. The forge needs at least 30 heat."
    }

    updateForge()
}

// 9. When Add heat is clicked, validate the input first.

addHeatButton.addEventListener("click", function() {
    const amount = Number(heatInput.value)

    if (
        heatInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        !Number.isInteger(amount) ||
        amount <= 0
    ) {
        messageText.textContent = "Please enter a positive whole number."
        return
    }

    heatForge(amount)
    heatInput.value = ""
})

// 10. When Make sword is clicked, call makeSword().

makeSwordButton.addEventListener("click", function() {
    makeSword()
})

// 11. When Reset forge is clicked, call resetForge().

resetButton.addEventListener("click", function() {
    resetForge()
})

// 12. Start the game.

resetForge()
