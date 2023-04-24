class Header{
    CreateHtml(){
        this.headerLogo = document.createElement("i");
        this.headerLogo.classList = "fa-regular fa-face-smile";

        this.headerFigure = document.createElement("figure");
        this.headerFigure.classList = "header__logo";

        this.headerText = document.createElement("h1");
        this.headerText.classList = "header__text";
        this.headerText.innerText = "Collection of Happiness";

        this.header = document.createElement("header");
        this.header.classList = "header";
        
        //figure append i
        this.headerFigure.appendChild(this.headerLogo);
        //header append stuff
        this.header.appendChild(this.headerFigure);
        this.header.appendChild(this.headerText);
        document.getElementsByTagName("body")[0].appendChild(this.header);
    }
}

class Footer{
    CreateHtml(){
        this.footerParagraph = document.createElement("p");
        this.footerParagraph.innerText = "Gemaakt door - Kyryl Ieremieiev SD2D MediaCollege";

        this.footer = document.createElement("footer");
        this.footer.appendChild(this.footerParagraph);

        document.getElementsByTagName("body")[0].appendChild(this.footer);
    }
}

class LeftPanel{
    constructor(){
        this.episode = document.getElementsByClassName("episodes__episode")
    }

    CreateHtml(){
        this.episodesUl = document.createElement("ul");
        this.episodesUl.classList = "episodes";
        for(let i = 0; i < 4; i++){
            this.episodeDate = document.createElement("p");
            this.episodeDate.classList = "episodes__date";
            this.episodeImg = document.createElement("img");
            this.episodeImg.classList = "episodes__image";
            this.episodeImg.setAttribute("alt", "episode cover image");
            this.episodeTitle = document.createElement("h2");
            this.episodeTitle.classList = "episodes__title";

            this.episodeLi = document.createElement("li");
            this.episodeLi.classList = "episodes__episode";
            this.episodeLi.appendChild(this.episodeDate);
            this.episodeLi.appendChild(this.episodeImg);
            this.episodeLi.appendChild(this.episodeTitle);

            this.episodesUl.appendChild(this.episodeLi);
        }

        this.episodeSection = document.createElement("section");
        this.episodeSection.classList = "leftSection";
        this.episodeSection.appendChild(this.episodesUl)
        document.getElementsByTagName("main")[0].appendChild(this.episodeSection);
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

    CreateHtml(){
        this.featuredEpisodeDate = document.createElement("p");
        this.featuredEpisodeDate.classList = "featuredEpisode__datum";

        this.featuredEpisodeImage = document.createElement("img");
        this.featuredEpisodeImage.classList = "featuredEpisode__image";
        this.featuredEpisodeImage.setAttribute("alt", "cover of the featured episode");

        this.featuredEpisodeTitle = document.createElement("h2");
        this.featuredEpisodeTitle.classList = "featuredEpisode__title";
        
        this.featuredFigure = document.createElement("figure");
        this.featuredFigure.classList = "featuredEpisode";
        //figure append
        this.featuredFigure.appendChild(this.featuredEpisodeDate);
        this.featuredFigure.appendChild(this.featuredEpisodeImage);
        this.featuredFigure.appendChild(this.featuredEpisodeTitle);


        this.featuredEpisodeParagraph = document.createElement("p");
        this.featuredEpisodeParagraph.classList = "featuredEpisode__paragraph";

        this.featuredAudio = document.createElement("a");
        this.featuredAudio.classList = "featuredEpisode__audio";
        this.featuredAudio.setAttribute("id", "js--audio")
        this.featuredAudio.innerText = "Audio afspelen";

        this.featuredSource = document.createElement("a");
        this.featuredSource.classList = "featuredEpisode__source";
        this.featuredSource.setAttribute("id", "js--source")
        this.featuredSource.innerText = "Source >";

        this.navigation = document.createElement("nav");
        this.navigation.classList = "featuredEpisode__navigation";

        //nav append a
        this.navigation.appendChild(this.featuredAudio);
        this.navigation.appendChild(this.featuredSource);

        this.rightSection = document.createElement("section");
        this.rightSection.classList = "rightSection";

        //rightSection Append
        this.rightSection.appendChild(this.featuredFigure);
        this.rightSection.appendChild(this.featuredEpisodeParagraph);
        this.rightSection.appendChild(this.navigation);

        this.main = document.createElement("main");

        this.main.appendChild(this.rightSection);
        
        document.getElementsByTagName("body")[0].appendChild(this.main);
    }

    ApplyDataToFeaturedEpisode(data, currentFeatured){
        this.applyDataToRightPanel = new ApplyDataToRightPanel(data, this.featured);
        this.applyDataToRightPanel.ApplyDataToFeaturedDate(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedCover(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedTitle(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedText(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedAudio(currentFeatured);
        this.applyDataToRightPanel.ApplyDataToFeaturedSource(currentFeatured);
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

    ApplyDataToFeaturedAudio(currentFeatured){
        this.featuredAudio = document.getElementById("js--audio");
        this.featuredAudio.setAttribute("href", Object.values(this.data.episodes[currentFeatured])[4]);
    }

    ApplyDataToFeaturedSource(currentFeatured){
        this.featuredSource = document.getElementById("js--source");
        this.featuredSource.setAttribute("href", Object.values(this.data.episodes[currentFeatured])[5]);
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
        this.header = new Header();
        this.footer = new Footer();


        this.header.CreateHtml();
        this.rightPanel.CreateHtml();
        this.leftPanel.CreateHtml();
        this.footer.CreateHtml();

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