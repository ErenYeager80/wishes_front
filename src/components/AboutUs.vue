<template>
  <teleport to="body">
    <div class="fixed z-[850] inset-0 overflow-y-auto bg-black bg-opacity-50 ">
      <div class="flex items-start justify-center min-h-screen pt-24 text-center">
        <div class="shadow-xl bg-gradient-to-b from-[#143045] to-[#675a3d] rounded-lg text-left overflow-hidden p-8 w-1/4"
             role="dialog"
             aria-modal="true"
             aria-labelledby="modal-headline">
                <h2 class="card-title textarea-xxl justify-center pb-5">درباره ما</h2>
                <p class="pb-4">
                  elementum curae libero quaeque ne altera nonumes tempus feugait ex
                  phasellus pharetra dui hac est sollicitudin pertinax theophrastus
                  delicata ante eloquentiam errem menandri te ultrices dissentiunt viderer
                  dolor graece brute perpetua vivendo accommodare habeo numquam doming
                  ocurreret inciderint conclusionemque dolorem dictas libris voluptaria
                  epicuri delenit nascetur semper et platonem mediocrem quaerendum nihil
                  vix omittam brute est fringilla quem ocurreret meliore ei ligula
                  singulis an expetendis ridiculus pri pharetra justo vivendo vix
                  repudiandae agam finibus postea pericula efficiantur magna similique
                  mollis nisl libero auctor convallis interdum interpretaris suscipiantur
                  usu dictum petentium similique electram signiferumque vis reformidans
                </p>
          <div class="flex justify-center">
            <button
                @click="closeModal"
                class="mt-3 font-semibold items-center p-3 w-1/3 bg-[#3a7da3] flex justify-center rounded-md"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['close'])
const closeModal = () => {
  emits('close')
}
</script>