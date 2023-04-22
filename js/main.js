class Header{

}

class Footer{

}

class LeftPanel{
    constructor(){
        this.episode = document.getElementsByClassName("episodes__episode")
    }

    ApplyDataToEpisode(data){
        //applies random episodes to the li's
        //for gods sake this code is unnecessarily complicated but it works
        this.applyDataToLeftPanel = new ApplyDataToLeftPanel(data, this.episode);
        this.randomArr = [];
        let randomCheck = false;
        for(let i = 0; i < this.episode.length; i++){
            this.random = Math.floor(Math.random() * Object.keys(data.episodes).length);
            //checks is random number has been added before
            for(let x = 0; x < this.randomArr.length; x++){
                if(this.random == this.randomArr[x]){
                    i-=1;
                    randomCheck = true;
                }
            }
            if(randomCheck == false){
                this.applyDataToLeftPanel.ApplyDataToDate(i, this.random);
                this.applyDataToLeftPanel.ApplyDataToCover(i, this.random);
                this.applyDataToLeftPanel.ApplyDataToTitle(i, this.random);
                this.randomArr.push(this.random);
                console.log("baller")
            }
            else{
                randomCheck = false;
            }
        }
        
    }

    episodeOnclick(){
        for(let i = 0; i < this.episode.length; i++){
            this.episode[i].onclick = ()=>{
                app.applyEpisodeToFeatured(i)};
        }
    }
}

class ApplyDataToLeftPanel{
    constructor(data, episode){
        this.data = data;
        this.episode = episode;
    }

    ApplyDataToDate(current, random){
        this.episode[current].children[0].innerText =  Object.values(this.data.episodes[random])[2];
    }

    ApplyDataToCover(current, random){
        this.episode[current].children[1].setAttribute("src", Object.values(this.data.episodes[random])[6]);
    }

    ApplyDataToTitle(current, random){
        this.episode[current].children[2].innerText =  Object.values(this.data.episodes[random])[0];
    }
}

class RightPanel{
    constructor(){
        this.featured = document.getElementsByClassName("featuredEpisode");
    }

    ApplyDataToFeaturedEpisode(data, currentFeatured){
        this.applyDataToRightPanel = new ApplyDataToRightPanel(data, this.featured);
        this.applyDataToRightPanel.ApplyDataToFeaturedDate(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedCover(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedTitle(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedText(currentFeatured);
    }

}

class ApplyDataToRightPanel{
    constructor(data, featured){
        this.data = data;
        this.featured = featured;
    }

    ApplyDataToFeaturedDate(currentFeatured){
        this.featured[0].children[0].innerText = Object.values(this.data.episodes[currentFeatured])[2]
    }

    ApplyDataToFeaturedCover(currentFeatured){
        this.featured[0].children[1].setAttribute("src", Object.values(this.data.episodes[currentFeatured])[6])
    }

    ApplyDataToFeaturedTitle(currentFeatured){
        this.featured[0].children[2].innerText = Object.values(this.data.episodes[currentFeatured])[0];
    }

    ApplyDataToFeaturedText(currentFeatured){
        this.featuredText = document.getElementsByClassName("featuredEpisode__paragraph")[0];
        this.featuredText.innerText = Object.values(this.data.episodes[currentFeatured])[3]
    }
}

class DetailCard{
    
}

class GetData{
    async getData(){
        await fetch("../data/data.json").then(response =>{
            return response.json();
            }).then(data =>{
                this.data = data;
            });
    }
}

class App{
    constructor(){
        this.currentFeatured = this.initRandom();
        this.getData = new GetData();
        this.leftPanel = new LeftPanel();
        this.rightPanel = new RightPanel();
        this.getData.getData().then(()=>{
            this.data = this.getData.data;
            this.leftPanel.ApplyDataToEpisode(this.data);
            this.leftPanel.episodeOnclick();
            this.rightPanel.ApplyDataToFeaturedEpisode(this.data, this.currentFeatured);
        });
    }

    initRandom(){
        let random = Math.floor(Math.random() * 7);
        return random
    }

    applyEpisodeToFeatured = (newFeatured) =>{
        console.log(newFeatured)
        this.rightPanel.ApplyDataToFeaturedEpisode(this.data, this.leftPanel.randomArr[newFeatured]);
    }
}

let app = new App();