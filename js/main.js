class Header{

}

class Footer{

}

class LeftPanel{
    constructor(){
        this.episode = document.getElementsByClassName("episodes__episode")
    }

    ApplyDataToEpisode(data){
        this.applyDataToLeftPanel = new ApplyDataToLeftPanel(data, this.episode);
        this.applyDataToLeftPanel.AssignClass();
        this.applyDataToLeftPanel.ApplyDataToDate();
        this.applyDataToLeftPanel.ApplyDataToCover();
        this.applyDataToLeftPanel.ApplyDataToTitle();
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

    AssignClass(){
        for(let i = 0; i < this.episode.length; i++){
            this.episode[i].classList.add("episodeNumber" + 1)
        }
    }

    ApplyDataToDate(){
        for(let i = 0; i < this.episode.length; i++){
            this.episode[i].children[0].innerText =  Object.values(this.data.episodes[i])[2];
        }
    }

    ApplyDataToCover(){
        for(let i = 0; i < this.episode.length; i++){
            this.episode[i].children[1].setAttribute("src", Object.values(this.data.episodes[i])[6]);
        }
    }

    ApplyDataToTitle(){
        for(let i = 0; i < this.episode.length; i++){
            this.episode[i].children[2].innerText =  Object.values(this.data.episodes[i])[0];
        }
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
        this.currentFeatured = 0;
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

    applyEpisodeToFeatured = (newFeatured) =>{
        console.log(newFeatured)
        this.rightPanel.ApplyDataToFeaturedEpisode(this.data, newFeatured);
    }
}

let app = new App();