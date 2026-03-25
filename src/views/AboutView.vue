<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <div v-for="n in data">
    {{ n }}
  </div>
  <div>
    <button @click="authorize">Authorize</button>
  </div>
  <div>
    <button @click="listFilesUnderGoogleDriveFolder">list 10 files under boroghor</button>
    <textarea v-model="beautifyDataBoroghorFiles"></textarea>
  </div>
  <div>
    <button @click="readDataFromGoogleDriveFile">read data from google drive file</button>
    <textarea v-model="beautifyDataFromFile"></textarea>
  </div>
  <div>
    <button @click="searchByFolderName">search by folderName</button>
    <select v-model="selectedGodown" @change="selectGodown">
      <option v-for="n in godowns" :value="n.key" :disabled="n.disabled">
        {{ n.value }}
      </option>
    </select>
    <textarea v-model="beautifySearchedFolder"></textarea>
  </div>
  <!-- <div>
    <button @click="extractFromSheetJS_test">Test JS</button>
  </div> -->
  <div>
    <input type="checkbox" v-model="showTests">Show Test
  </div>
  <div v-if="showTests">
    <input type="text" v-model="inputText">Input id
    <button @click="sendDatatoBackend">sendDatatoBackend</button>
    <div>
      <button @click="receiveDatafromBackend">receiveDatafromBackend</button>
      <textarea v-model="beautifyData"></textarea>
    </div>
  </div>

  <div v-if="inProgress">
    <spinner size="small"></spinner>
  </div>

</template>

<style>

</style>


<script>
import axios from "axios"
import spinner from "@/components/spinner.vue";

export default {

  components: {
    spinner
  },

  data() {
    return {
      data: null,
      inputText: null,
      receivedFromBackend: null,
      renderedPath: null,
      boroghorFiles: null,
      showTests: false,
      parsedDataFromFile: null,
      inProgress: false,
      godowns: [
        {key: 'select a godown', value: 'select a godown', disabled: true},
        {key: 'Boroghor', value: 'Boroghor', disabled: false},
        {key: 'Senpara', value: 'Senpara', disabled: false}
      ],
      selectedGodown: null,
      searchedFolder: null,
    }
  },

  computed: {
    beautifyData() {
      var data = this.receivedFromBackend;
      var beautifulData = JSON.stringify(data, null, 2);
      return beautifulData;
    },

    beautifyDataBoroghorFiles() {
      var data = this.boroghorFiles;
      var beautifulData = JSON.stringify(data, null, 2);
      return beautifulData;
    },

    beautifyDataFromFile() {
      var data = this.parsedDataFromFile;
      var beautifulData = JSON.stringify(data, null, 2);
      return beautifulData;
    },

    beautifySearchedFolder() {
      var data = this.searchedFolder;
      var beautifulData = JSON.stringify(data, null, 2);
      return beautifulData;
    }

  }, 

  methods: {
    async sendDatatoBackend() {
      debugger;
      var id = this.inputText;
      if(!id) return;
      var res = await axios.get("https://express-app-r2vg.onrender.com/events/"+id); //http://localhost:5000/events/
      if(res.status == "200")
        this.receivedFromBackend = res.data;
      else
        alert(`Error at getting data. status: ${res.status}`);
    },

    async receiveDatafromBackend() {
      debugger;
      let res = await axios.get("https://express-app-r2vg.onrender.com/events/"); //http://localhost:5000/events
      debugger;
      if(res.data)
        this.receivedFromBackend = res.data;
      else 
        alert(`Error at getting data. status: ${res.status}`);
      // return res.data;
    },

    async authorize() {
      debugger;
      var res = await axios.get("https://express-app-r2vg.onrender.com/authorize"); //"http://localhost:5000/authorize" //await axios.get("https://express-app-r2vg.onrender.com/authorize");
      var response = res.data;
      if(!response || !response.ok) {
        alert(response.status);
        return;
      }
      if(response.status == 'Client is authorized already.') {
        alert(response.status);
        return;
      }
      var url = response.authUrl;
      window.location.href = url;
      // window.open( //'noopener, noreferrer'x
      //   url,
      //   '_target', // <- This is what makes it open in a new window.
      //   'noopener, noreferrer'
      // );
      // router.push(url);
      debugger;
    },

    async listFilesUnderGoogleDriveFolder() {
      debugger;
      this.inProgress = true;
      var pageSize = 10;
      var folderId = '1ZbV78lR5wQntzf1zgfQ5NlzTsgf2ThSg'; //This is boroghor directory ID.
      var url = `https://express-app-r2vg.onrender.com/listFilesUnderFolder/${folderId}/pageSize/${pageSize}`; //https://express-app-r2vg.onrender.com //http://localhost:5000
      var res = await axios.get(url);
      res = res.data;
      if(!res || res.status != 'Ok') {
        console.log(res.status);
        alert(res.status);
        this.inProgress = false;
        return;
      }
      this.boroghorFiles = res.files;
      this.inProgress = false;
    },

    async readDataFromGoogleDriveFile() {
      debugger;
      this.inProgress = true;
      var fileId = '1huuXH6UHB17KytXTQ5B0hFa2c5t1ilBz' //This is 1kgChini.xls
      var url = `https://express-app-r2vg.onrender.com/readFromFileById/${fileId}`; //https://express-app-r2vg.onrender.com //http://localhost:5000
      var res = await axios.get(url);
      res = res.data;
      if(!res || res.status != 'Ok') {
        console.log(res.status);
        alert(res.status);
        this.inProgress = false;
        return;
      }
      this.parsedDataFromFile = res.parsedData;
      this.inProgress = false;
    },

    async searchFolderByNameFromGoogleDrive(folderName) {
      debugger;
      this.inProgress = true;
      if(!folderName) return;
      var url = `https://express-app-r2vg.onrender.com/searchFolderFromDrive/${folderName}`; //http://localhost:5000 //https://express-app-r2vg.onrender.com
      var res = await axios.get(url);
      res = res.data;
      if(!res || !res.ok) {
        alert(res.status);
        this.inProgress = false;
        return;
      }
      this.searchedFolder = res.folders;
      this.inProgress = false;
    },

    async selectGodown() {
      debugger;
      var selectedGodown = this.selectedGodown;
      console.log(selectedGodown);
      var searchedFolder = await this.searchFolderByNameFromGoogleDrive(selectedGodown);
    }


  },

  created() {
    debugger;
    // $el = this;
    var data = ['Hello', 'World'];
    this.data = data;
  }

}

</script>
