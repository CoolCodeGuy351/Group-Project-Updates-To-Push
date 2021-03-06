/* Smooth scrolling */

$(document).ready(function() {
    // Global Variables
    // --------------------------------------------------------------------------------------------------------
    var initialPlaylist = [];
    /// Then we need to filter initialPlaylist into filteredPlaylistArrayt
    var filteredPlaylist = [];
    var userProfile = [];
    var counter = 0;
    var genreChoicesArray = ["Action Packed", "Action", "Adventure", "War", "Western", "Light-Hearted", "Animation", "Comedy", "Family", "Musical", "Romance", "Adrenaline Rush", "Crime", "Horror", "Mystery", "Thriller", "Fantastical", "Animation", "Fantasy", "Foreign", "Sci-Fi", "Heavy-Hitters", "Documentary", "Drama", "History"];
    // Arrays of movie filtered titles
    var movieTitleGen = [];
    var movieMainInd = [];
    var movieYear = [];
    var movieImdbRat = [];
    var movieMpaa = [];
    // counters
    var counterP = 1;
    var counterT = 0;
    var counterY = 0;
    var counterR = 0;
    var counterRa = 0;
    // Array lengths
    var movieTitleL = 0;
    var movieMainIndL = 0;
    var movieYearL = 0;
    var movieImbdRatL = 0;

    // make number return by imdb votes an movieMainInd array
    var arr;
    // splits arr varialbe at , of movieMainInd array
    var num;
    // int of imbd votes for movieMainInd array
    var numImbdVotes;
    // value of year of movie in movieYear array
    var year;
    // variable to compare whether indie was selected
    var indie = 200000;



    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
        // This is to make the buttons stick when clicked
       $(".question-buttons").click(function() {
        $(".question-buttons").addClass("buttonFocused");
        $(".question-buttons").focus();
        console.log("WORKED!")
    })


    $('.question-buttons').click(function() {
        if ($(this).hasClass('buttonFocused')) {
            $(this).removeClass('buttonFocused')
        } else {
            $(this).addClass('buttonFocused')
        }
    });
    /* Javascript | Jquery */

    // USER SELECTS DATE RANGE                      //CALIBER GETS PASSED AS NUMBER         //PUSH ALL RATINGS THAT USER WANTS TO SEE INTO ARRAY
    /* GENRE (number) , INDIE (number) , DATE RANGE1(YEAR)(number) , DATERANGE2(YEAR)(number) , CALIBUR1(6.0)(number), CALIBUR2(9.0)(number), RATING(G)(string), RATING(PG)(string), RATING(R)(string) */

    //Youtube iFrame video player

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    // FRONT END TO DO - In order for this onclick to work each dropdown item needs to have the class "genre" and a value="genreName"
    $('.genre').on('click', function() {
        // checks to make sure userProfile is empty then adds the value of the drop down genre selected to the empty userProfile array
        if (counter === 0) {
            userProfile.unshift($(this).val());
            findTitle();
            console.log(userProfile);
            $('#hide-display').css('display', "block");
            $('.placeholderSidebarLeft').css("display", "none")
            $('.placeholderSidebarRight').css("display", "none")
            questionStartFromSecond();
        }

    });

    function questionStartFromSecond() {

        $('#render-div').hide();
        $('#render-div').empty();
        $('#render-div').show(2000);

        var questionTwoDiv = $('<div>').addClass('question-two-div');


        var questionTwoButtonDiv = $('<div>').addClass('question-two-button-div');
        var questionTwoText = $('<p>').addClass('question-two-html').text("Would you like a mainstream movie or indie movie?") /*.css('display',block)*/ ;
        var questionTwoButtonIndie = $('<button>').addClass('question-two-button').text("Indie Movie").attr("value", "199999");
        var questionTwoButtonMainstream = $('<button>').addClass('question-two-button').text("Mainstream Movie").attr("value", "200001");

        questionTwoButtonDiv.append(questionTwoButtonIndie);
        questionTwoButtonDiv.append(questionTwoButtonMainstream);
        questionTwoDiv.prepend(questionTwoText);
        questionTwoDiv.append(questionTwoButtonDiv);

        $('#render-div').append(questionTwoDiv);

        // Once the user clicks the rendered buttons (indie / mainstream) the value of the button will be pushed to the array (userPlaylist) as the 2nd element in the array
        // The div will fade out and once its faded out completely the div will be emptyed and will be ready for the next question to be populated inside. 

        if (counter === 0) {
            $(document).on("click", ".question-two-button", function() {
                console.log("userProfile array after button click, before any pushes inside questionStartFromSecond(): " + userProfile);
                // Why is this pushing twice (the entire function is running twice)
                userProfile.push(parseInt($(this).val()));

                console.log("userProfile array after push inside questionStartFromSecond(): " + userProfile);
                mainIndie();
                $('#render-div').hide();
                $('#render-div').empty();
                console.log("userProfile array after button click, deeper still questionStartFromSecond(): " + userProfile);



                questionThree();
            })
        } /*If statement ends here*/
    } /*Question Start From here ends here */

    function questionThree() {

        $('#render-div').show(2000);

        var questionThreeDiv = $('<div>').addClass('question-three-div');
        var questionThreeButtonDiv = $('<div>').addClass('question-three-button-div');
        var questionThreeText = $('<p>').addClass('question-three-html').text("Pick the year range") /*.css('display',block)*/ ;
        var buttonRangeOne = $('<button>').addClass('question-three-button').text('1950').attr("value", "1950");
        var buttonRangeTwo = $('<button>').addClass('question-three-button').text('1970').attr("value", "1970");
        var buttonRangeThree = $('<button>').addClass('question-three-button').text('1990').attr("value", "1990");
        var buttonRangeFour = $('<button>').addClass('question-three-button').text('2017').attr("value", "2017");

        // Combine content and render to page
        questionThreeButtonDiv.prepend(buttonRangeOne);
        questionThreeButtonDiv.append(buttonRangeTwo);
        questionThreeButtonDiv.append(buttonRangeThree);
        questionThreeButtonDiv.append(buttonRangeFour);

        questionThreeDiv.prepend(questionThreeText);
        questionThreeDiv.append(questionThreeButtonDiv);

        $('#render-div').append(questionThreeDiv);
        if(counter === 0){
        $(document).on("click", ".question-three-button", function() {

            userProfile.push(parseInt($(this).val()));
            // console.log(userProfile[2]);
            // console.log(userProfile[3]);
            console.log(userProfile);

            if (userProfile.length == 4) {

                    if (userProfile[userProfile.length - 1] > userProfile[userProfile.length - 2]) {
                        $('#render-div').hide();
                        $('#render-div').empty();
                        yearInterval();
                        questionFour();
                        console.log(userProfile);
                    } else {

                        var a = userProfile[userProfile.length - 1];
                        userProfile[userProfile.length - 1] = userProfile[userProfile.length - 2];
                        userProfile[userProfile.length - 2] = a;

                        $('#render-div').hide();
                        $('#render-div').empty();
                        console.log(userProfile);
                        yearInterval();
                        questionFour();
                    }
            }

            })
        } // end of counter if statement
    }

    function questionFour() {
        $('#render-div').show(2000);

        var questionFourDiv = $('<div>').addClass('question-four-div');
        var questionFourButtonDiv = $('<div>').addClass('question-four-button-div');
        var questionFourText = $('<p>').addClass('question-three-html').text("What calibur of movie would you like to see?") /*.css('display',block)*/ ;
        var buttonCriticOne = $('<button>').addClass('question-four-button').text('I dont care').attr("value", "any");
        var buttonCriticTwo = $('<button>').addClass('question-four-button').text('Bad Movies ONLY').attr("value", "bad");
        var buttonCriticThree = $('<button>').addClass('question-four-button').text('Crown Pleaser').attr("value", "crowd");
        var buttonCriticFour = $('<button>').addClass('question-four-button').text('Critically Acclaimed').attr("value", "critic");

        questionFourDiv.prepend(questionFourText);

        questionFourButtonDiv.prepend(buttonCriticOne);
        questionFourButtonDiv.append(buttonCriticTwo);
        questionFourButtonDiv.append(buttonCriticThree);
        questionFourButtonDiv.append(buttonCriticFour);

        questionFourDiv.append(questionFourButtonDiv);

        $('#render-div').append(questionFourDiv);
        if(counter === 0){
        $(document).on("click", ".question-four-button", function() {

            if ($(this).val() == "any") {
                userProfile.push(1);
                userProfile.push(10);
                movieRating();
                $('#render-div').hide();
                $('#render-div').empty();
                console.log(userProfile);
                questionFive();
            }
            if ($(this).val() == "bad") {
                userProfile.push(1);
                userProfile.push(4);
                movieRating();
                $('#render-div').hide();
                $('#render-div').empty();
                console.log(userProfile);
                questionFive();
            }
            if ($(this).val() == "crowd") {
                userProfile.push(4);
                userProfile.push(8);
                movieRating();
                $('#render-div').hide();
                $('#render-div').empty();
                console.log(userProfile);
                questionFive();
            }
            if ($(this).val() == "critic") {
                userProfile.push(8);
                userProfile.push(10);
                movieRating();
                $('#render-div').hide();
                $('#render-div').empty();
                console.log(userProfile);
                questionFive();
            }

            /*
            userProfile.push($(this).val());
            console.log(userProfile);
            $('#render-div').hide();
            $('#render-div').empty();
            questionFive();*/
            })
        } // end of counter if statement
    }

    function questionFive() {
        $('#render-div').show(2000);

        // QUESTION 3 IS FILTER BY YEAR RANGE
        // Create Content
        var questionFiveDiv = $('<div>').addClass('question-five-div');
        var questionFiveButtonDiv = $('<div>').addClass('question-five-button-div');
        var questionFiveText = $('<p>').addClass('question-five-html').text("Select Movie Association Ratings:") /*.css('display',block)*/ ;
        var buttonRatingOne = $('<button>').addClass('question-five-button').text('G').attr("value", 'G');
        var buttonRatingTwo = $('<button>').addClass('question-five-button').text('PG').attr("value", 'PG');
        var buttonRatingThree = $('<button>').addClass('question-five-button').text('PG-13').attr("value", 'PG-13');
        var buttonRatingFour = $('<button>').addClass('question-five-button').text('R').attr("value", 'R');
        var buttonStart = $('<button>').addClass('start').text('Start Watching Trailers').css('display', "block");

        questionFiveDiv.prepend(questionFiveText);

        questionFiveButtonDiv.prepend(buttonRatingOne);
        questionFiveButtonDiv.append(buttonRatingTwo);
        questionFiveButtonDiv.append(buttonRatingThree);
        questionFiveButtonDiv.append(buttonRatingFour);
        questionFiveButtonDiv.append(buttonStart)
        questionFiveDiv.append(questionFiveButtonDiv);

        $('#render-div').append(questionFiveDiv);

        if(counter === 0){
        $(document).on("click", ".question-five-button", function() {

            if (userProfile.length < 10) {
                counterRa = 0;
                userProfile.push($(this).val());
                console.log(userProfile);
                movieRated();

            }

        })


        $(document).on("click", ".start", function() {
            // Only if at least one rating option has been selected
            if (userProfile.length >= 7) {
                console.log("start was clicked");
                $('#render-div').hide();
                $('#render-div').empty();
                videoRender();
            }

        });

    } //end of the counter if statement
        var createNewPlaylistDiv = $('<div>').addClass('create-new-playlist-div');
        var addNewDiv = $('<div>').addClass('new-playlist-div');
        var genreNumToString = userProfile[0];
        console.log("This console.log should show the genre selected as a string: " + genreChoicesArray[genreNumToString]);
        var genreText = $('<h6>').addClass('genre-text').text("test" /*genreChoicesArray[genreNumToString]*/ );

        addNewDiv.append(genreText);
        createNewPlaylistDiv.append(genreText);
        createNewPlaylistDiv.append(addNewDiv);
        $('#playlist-div').append(createNewPlaylistDiv);



        ////////} /* If counter statement end */

        $('#playlist-div').append(createNewPlaylistDiv);

    } // Question 5 end function

    // function for producing titles
    function findTitle() {
        console.log("START OF MOVIE TITLE");
        // produce Titles 
        if (counterP < 10) {
            queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=a4a27185a8d4d5eda2d9b10434e6cad8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=" + userProfile[0] + "&page=" + counterP;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(counterP);
                // adds title of movies
                for (var i = 0; i < response.results.length; i++) {
                    movieTitleGen.push(response.results[i].title);
                    console.log("Title: " + response.results[i].title);

                }
                counterP++;
                // total title of movies
                movieTitleL = movieTitleGen.length;
                console.log(movieTitleGen);
                console.log(movieTitleL);
                findTitle();

            });
        }
        console.log("End of the MOVIE TITLE");
    } // end of finds the title function

    function mainIndie() {
        console.log("Start of the MainIndie");
        if (counterT < movieTitleL) {
            // Filter movie for mainstream and indie
            var queryURLS = "http://www.omdbapi.com/?t=" + movieTitleGen[counterT] + "&y=&plot=short&r=json";
            $.ajax({
                    url: queryURLS,
                    method: "GET"
                }).done(function(response) {
                    // if there is a movie title in this api, it will run
                    if (response.Response !== "False") {
                        arr = response.imdbVotes;
                        // console.log(response);
                        console.log(movieTitleGen[counterT]);
                        num = arr.split(',');
                        arr = num.join("");
                        numImbdVotes = parseInt(arr);
                        console.log(numImbdVotes);
                        console.log(userProfile[1]);
                        if (indie > userProfile[1]) {
                            // adds indie films
                            add(numImbdVotes);
                        } else {
                            // adds mainstream film
                            add2(numImbdVotes);
                        }
                    } // end of if statement false
                    counterT++;
                    movieMainIndL = movieMainInd.length;
                    console.log(movieMainIndL);
                    mainIndie();

                })
                // .error(function(e) {
                // console.log(e)
                // })
                // end of else if statement based on mainstream/indie
        } // end of the if counter < movie title statement
        console.log("End of the MainIndie");
    } // end of main indie function
    function yearInterval() {
        if (counterY < movieMainIndL) {
            console.log("start of year interval");
            // filter movie based on year interval
            var queryURLS = "http://www.omdbapi.com/?t=" + movieMainInd[counterY] + "&y=&plot=short&r=json";
            $.ajax({
                url: queryURLS,
                method: "GET"
            }).done(function(response) {
                year = parseInt(response.Year);
                console.log(year);
                console.log(" first input  " + userProfile[2] + " second input " + userProfile[3])
                if ((year > userProfile[2]) && (year < userProfile[3])) {
                    movieYear.push(movieMainInd[counterY]);
                    console.log(movieYear);
                }
                counterY++;
                movieYearL = movieYear.length;
                console.log(movieYearL);
                yearInterval();

            });
            // end of else if statement for filter by movie year interval
        }
        console.log("End of year Interval");
    };

    function movieRating() {
        if (counterR < movieYearL) {
            console.log("start of Movie Rating");
            // filer movie based on imdb rating
            var queryURLS = "http://www.omdbapi.com/?t=" + movieYear[counterR] + "&y=&plot=short&r=json";
            $.ajax({
                url: queryURLS,
                method: "GET"
            }).done(function(response) {
                if (response.imdbRating !== "Undefined") {
                    ratings = parseFloat(response.imdbRating);

                    // add movie within ratings
                    if (ratings > userProfile[4] && ratings < userProfile[5]) {
                        movieImdbRat.push(movieYear[counterR]);
                        console.log(movieImdbRat);
                    }
                }
                counterR++;
                movieImbdRatL = movieImdbRat.length;
                console.log(movieImbdRatL);
                movieRating();

            });
            // end of else if statement for filter imdb rating
        } // if movie statement
        console.log("End of movie rating");
    } // end of function movie rating

    function movieRated() {
        if (counterRa < movieImbdRatL) {
            // filter movie based on MPAA ratings
            console.log("start of movie rated");
            var queryURLS = "http://www.omdbapi.com/?t=" + movieImdbRat[counterRa] + "&y=&plot=short&r=json";
            $.ajax({
                url: queryURLS,
                method: "GET"
            }).done(function(response) {
                // console.log(response);
                var rated = response.Rated;
                if (userProfile.indexOf(rated) !== -1 && (movieMpaa.indexOf(movieImdbRat[counterRa]) === -1)) {
                    movieMpaa.push(movieImdbRat[counterRa]);
                }
                counterRa++;
                console.log(movieMpaa);
                movieRated();

            });
        } // end of else if statement for MPAA ratings
        console.log("End of movie Rating");
    } // end of the movie rated function



    // pushes indie films
    function add(numImbdVotes) {
        if (numImbdVotes < 20000) {
            movieMainInd.push(movieTitleGen[counterT]);
            console.log(movieMainInd);
        }
    } // end of add function pushes indie films
    function add2(numImbdVotes) {
        if (numImbdVotes > 20000) {
            movieMainInd.push(movieTitleGen[counterT]);
            console.log(movieMainInd);
        }
    } // end of add2 function adds only mainstream films   



    function videoRender(){

        $('#render-div').show(1000);
        $('.placeholderSidebarLeft').css("display", "inline-block");
        $('.placeholderSidebarRight').css("display", "inline-block");
        /// MORE JOE CODE -- NEED TO EMPTY MOVIE INFO DIVS EACH TIME ///
        $('.placeholderSidebarRight').empty();

        if (counter === 0) {
            var createDiv = $('<div>').addClass('createButton').text("Create a new playlist");
            $('#playlist-div').prepend(createDiv);
        }



        var movieInfoContainer = $('<div>').addClass('movie-info-container');
        var moviePlayerContainer = $('<div>').addClass('movie-player-container');
        var moviePlayerDiv = $('<div id="player"></div>').addClass('movie-player-div');
        var leftArrow = $('<img>').addClass('left-arrow').attr('src', '../images/leftarrow.png').css('display', "inline-block");
        var rightArrow = $('<img>').addClass('right-arrow').attr('src', '../images/rightarrow.png').css('display', "inline-block");
        var textBetweenArrows = $('<p>').text("Previous / Next Trailer").addClass('text-between-arrows').css('display', "inline-block");

        //////////////////////////////////////////////////////////////////////////////////////

        /* Joe's code addition to render current movie stats to video render screen */
        var queryURLS = "http://www.omdbapi.com/?t=gravity";/* + counterArray;*/

        $.ajax({
                url: queryURLS,
                method: "GET"
        }).done(function(response) {

            var movieTitle = response.Title;
            var movieSummary = response.Plot;
            var runTime = response.Runtime;
            var releaseYear = response.Released;
            var movieAssociationRating = response.Rated;
            var tomatoRating = response.Ratings[1].Value;
            var metaRating = response.Ratings[2].Value;
            var poster = response.Poster;

            // Appending items to movieInfoContainer (top container)
            var movieTitleText = $('<p>').addClass('movie-title-text').text(movieTitle);
            movieInfoContainer.prepend(movieTitleText);

            var movieSummaryText = $('<p>').addClass('movie-summary-text').text(movieSummary);
            movieInfoContainer.append(movieSummaryText);

            // Appending Runtime, Release Date, rottem tomato score, metacritic score and poster // 

            var runTimeText =$('<p>').addClass('run-time-text').text('Runtime: ' + runTime);
            $('.placeholderSidebarRight').prepend(runTimeText);

            var releaseYearText = $('<p>').addClass('release-year-text').text('Release Year: ' + releaseYear);
            $('.placeholderSidebarRight').append(releaseYearText);

            var movieAssociationRatingText = $('<p>').addClass('movie-association-rating-text').text('Rated: ' + movieAssociationRating);
            $('.placeholderSidebarRight').append(movieAssociationRatingText);


            // Rotten Tomatoe and Metacritic Rating stuff ///////////////////////////////////////////////////// 
            var ratingsDiv = $('<div>').addClass('ratings-div');
            var textRatings = $('<p>').text("Reviews:").addClass('review-title');

            ratingsDiv.prepend(textRatings);

            var tomatoDiv =$('<div>').addClass('review-container').css('display','inline-block');
            var tomatoText =$('<p>').addClass('tomato-text').text("Rotten Tomatoes: " + tomatoRating);

            var metaDiv =$('<div>').addClass('review-container').css('display','inline-block');
            var metaText =$('<p>').addClass('meta-text').text("Meta Critic: " + metaRating);
 
            tomatoDiv.append(tomatoText);
            metaDiv.append(metaText);

            ratingsDiv.append(tomatoDiv);
            ratingsDiv.append(metaDiv);

            $('.placeholderSidebarRight').append(ratingsDiv);

            // Poster (its basically an image link/////////////////////////////////////////////////////////////////

            var posterImage = $('<img>').addClass('poster-image').attr('src', poster).attr("width","90%");
            $('.placeholderSidebarRight').append(posterImage);

            });

             moviePlayerContainer.prepend(moviePlayerDiv);

            $('#render-div').prepend(movieInfoContainer);
            $('#render-div').append(moviePlayerContainer);

            $('#render-div').append(leftArrow);
            $('#render-div').append(textBetweenArrows);
            $('#render-div').append(rightArrow);

            /*
            ALMOST THERE
            makeAjax(movieMpaaCounter);
        
            $(".right-arrow").click(function(){
            makeAjax(counterArray++);
            //renderVideo();//
            });

             $(".left-arrow").click(function(){
            if(counterArray !== 0){
            makeAjax(counterArray--);
            //renderVideo();//
            }
            });

            */
            onYouTubeIframeAPIReady();
    }
    
    // This butoon creates a new playlist if the user clicks on the create new playlist button OR is new to the site
    function createNewPlaylist() {
         // Arrays of movie filtered titles
        userProfile = [];
        movieTitleGen = [];
        movieMainInd = [];
        movieYear = [];
        movieImdbRat = [];
        movieMpaa = [];
        // counters
        counterP = 1;
        counterT = 0;
        counterY = 0;
        counterR = 0;
        counterRa = 0;
        // Array lengths
        movieTitleL = 0;
        movieMainIndL = 0;
        movieYearL = 0;
        movieImbdRatL = 0;
        console.log("test")

        $('#render-div').hide();
        $('#render-div').empty();
        $('.placeholderSidebarLeft').hide();
        $('.placeholderSidebarRight').hide();
        $('#render-div').show(1000);
        $('moviePlayerDiv').empty();


        var genreChoicesArray = ["Action Packed", "Action", "Adventure", "War", "Western", "Light-Hearted", "Animation", "Comedy", "Family", "Musical", "Romance", "Adrenaline Rush", "Crime", "Horror", "Mystery", "Thriller", "Fantastical", "Animation", "Fantasy", "Foreign", "Sci-Fi", "Heavy-Hitters", "Documentary", "Drama", "History"];
        var genreNumberArray = ["Action Packed", 28, 12, 10752, 37, "Light-Hearted", 16, 35, 10751, 10402, 10749, "Adrenaline Rush", 80, 27, 9648, 53, "Fantastical", 16, 14, 10769, 878, "Heavy-Hitters", 99, 18, 36];
        var questionOneDiv = $('<div>').addClass('question-one-div');

        var questionOneText = $('<p>').addClass('question-one-text').text('Choose a genre');
        var questionOneButtonContainer = $('<div>').addClass('question-one-button-div');

        // This is going to loop through the genreChoicesArray and it till print the various buttons with their respective attributes, it will prints them in a way so that
        // The titles of the row get printed without a class so that they cannot be clicked. 
        for (var i = 0; i < genreChoicesArray.length; i++) {
            if (i === 0 || i === 5 || i === 11 || i === 16 || i === 21) {

                if (i !== 0) {
                    var space = $('<br>').css('display', 'block');
                    questionOneButtonContainer.append(space);
                }

                var title = $('<button>').addClass('title').text(genreChoicesArray[i]);
                questionOneButtonContainer.append(title);

            } else {

                var button = $('<button>').addClass('genre-buttons-question-one').text(genreChoicesArray[i]).attr('value', genreNumberArray[i]);
                questionOneButtonContainer.append(button);

            }
        }

        questionOneDiv.append(questionOneButtonContainer);

        $('#render-div').append(questionOneDiv);


        if (counter === 0) {

            $(document).on("click", ".genre-buttons-question-one", function() {
                // checks to make sure userProfile is empty then adds the value of the drop down genre selected to the empty userProfile array
                userProfile.unshift(parseInt($(this).val()));
                console.log("userProfile array after button click, before questionStartFromSecond(): " + userProfile);
                findTitle();
                questionStartFromSecond();


            });
        } //If Statement with counter
        counter = 1;
    } // End Create Playlist Function

    // This line will look for any playlists added and will change the playlist when clicked
    $(document).on("click", ".createButton", createNewPlaylist);


});