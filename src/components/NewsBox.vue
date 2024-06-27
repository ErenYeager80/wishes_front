<template>
  <div class=" w-full border-t px-10 rounded-t-2xl">
      <h1 class="card-title justify-center py-4 ">اخبار روز</h1>
    <h1
        v-if="!userStore.getUser"
        class="w-full card-title justify-center pb-4 rounded-b-2xl text-[#c89763]"
    >
      لطفا ابتدا وارد شوید
    </h1>
      <PerfectScrollbar v-if="userStore.getUser" class="h-52">
        <div
            v-for="(news, index) in newsList"
            :key="index"
            class="wish-item mb-1"
        >
          <div class="wish-header">
            <img
                :src="
              news.file
                ? 'https://api.wishestree.ir/' + news.file.path
                : '/src/assets/wish-tree.png'
            "
                alt="Profile"
                class="wish-img w-10 h-10 rounded-full"
            />
            <p class="textarea-xxl font-semibold">{{ news.title }}</p>
          </div>
          <p class="textarea-xs wish-description">
            {{ news.content }}
          </p>
        </div>
      </PerfectScrollbar>
      <div class="flex flex-col items-center justify-center pt-8">
        <button
            v-if="userStore.getUser"
            type="submit"
            class="w-2/3 p-2 bg-[#3a7da3] rounded-md "
            @click="openModal"
        >
          اضافه کردن خبر
        </button>
      </div>
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box bg-gradient-to-b from-[#143045] to-[#675a3d]">
          <Form @submit="handleSubmit" class="form-control mt-7 gap-3 items-center">
            <h3 class="font-bold text-lg text-center">
              اطلاعات کاربری را وارد کنید
            </h3>

            <Field
                v-model="news.title"
                type="text"
                rules="required"
                name="news title"
                placeholder="عنوان خبر"
                class="input w-full max-w-xs"
            />
            <ErrorMessage
                class="flex justify-start text-red-600"
                dir="ltr"
                name="news title"
            />
            <Field
                v-model="news.content"
                type="text"
                name="news content"
                rules="required"
                placeholder="متن خبر"
                class="input w-full max-w-xs"
            />
            <ErrorMessage
                class="flex justify-start text-red-600"
                dir="ltr"
                name="news content"
            />
            <input
                @change="uploadFile($event)"
                type="file"
                class="file-input file-input-bordered file-input-info w-full max-w-xs"
                dir="ltr"
            />
            <div class="modal-action">
              <button
                  class="me-4 inline-flex items-center justify-center p-2 px-8 text-lg rounded-md bg-[#3a7da3] disabled:bg-[#2a5b75]"
                  :disabled="isButton"
              >
                ثبت
                <span v-if="isButton" class="ms-2 loading loading-spinner"></span>
              </button>
              <button
                  class="inline-flex items-center justify-center p-2 px-8 text-lg rounded-md bg-[#3a7da3] disabled:bg-[#2a5b75]"
                  @click="closeModal1"
                  type="button"
              >
                بستن
              </button>
            </div>
          </Form>
        </div>
      </dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import type News from "@/models/news";
import {useUserStore} from "@/stores/user";
import {useToast} from "vue-toast-notification";
import {ErrorMessage, Field, Form} from "vee-validate";
import {useNewsStore} from "@/stores/news";
import type Wish from "@/models/wish";
import {useApiStore} from "@/stores/api";
const news = ref({} as News);
const userStore = useUserStore();
const $toast = useToast();
const isButton = ref(false);
const newsStore = useNewsStore();
const newsList = ref<News[]>([]);
const apiStore = useApiStore();


function uploadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    const file = input.files[0];
    isButton.value = true;
    apiStore
        .post(
            import.meta.env.VITE_BASE_URL + "/file",
            { file: file },
            { "Content-Type": "multipart/form-data" }
        )
        .then((res) => {
          console.log(res);
          news.value.imageId = res.data.data.id;
          isButton.value = false;
        });
  }
}
const openModal = () => {
  if (userStore.getUser) {
    document.querySelector("#my_modal_3")!.showModal();
  } else {
    $toast.error("لطفا ابتدا وارد شوید", {
      position: "bottom-left",
    });
  }
};

const handleSubmit = () => {
  isButton.value = true;
  newsStore.add(news.value).then(() => {
    console.log("hello")
    isButton.value = false;
    $toast.success("خبر شما ثبت شد", {
      position: "bottom-left",
    });
    document.querySelector("#my_modal_3")!.close();
  });
};
const closeModal1 = () => {
  document.querySelector("#my_modal_3")!.close();
};

onMounted(() => {
  newsList.value = [];
  if (userStore.getUser) {
    newsStore.list().then(({ data }) => {
      newsList.value = data.data as News[];
    });
  }
});
</script>
<style scoped>
.wish-item {
  position: relative;
  padding-right: 3rem; /* space for image */
}

.wish-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.wish-img {
  position: absolute;
  top: 0;
  right: 0;
}

.wish-description {
  margin-top: 0;
}
</style>
