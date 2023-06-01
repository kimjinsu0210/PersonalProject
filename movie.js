const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGVmNjAwNjY3Nzk1NTk0NjA2ODJhMzQ0MTdhNWI3NCIsInN1YiI6IjY0NzQzZmRiOWFlNjEzMDBlNTk0ZjE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X24S0HtrfVPqdn_KYyr7ZFhGmQJ_FQ9yNldgdGNu6GY",
  },
};
// fetch
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let result = response["results"];
    // 영화 오픈 API 데이터 클라이언트로 뿌려주기(forEach)
    console.log("result",result);
    result.forEach((a) => {
      let m_id = a["id"];
      let m_title = a["title"];
      let m_overview = a["overview"];
      let m_poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
      let m_vote_average = a["vote_average"];
      let m_vote_count = a["vote_count"];
      let section = document.querySelector(".movie_list");
      let temp_html = `<div class="movie_info" onclick="alert('영화 id:'+' '+ ${m_id})">
                      <img
                      src='${m_poster_path}'
                      alt='${m_title}'
                      />
                      <hr/>
                      <h3 class="h_tag">${m_title}</h3>
                      <hr/>
                      <p>
                      ${m_overview}
                      </p>
                      <hr/>
                      <p>평점: ${m_vote_average}</p>
                      <p class="vote_num">추천 수: ${m_vote_count}</p>
                      
                      </div>`;
      section.insertAdjacentHTML("beforeend", temp_html);
      
    });
  })
  .catch((err) => console.error(err));


// 검색 기능(for)
function search() {
  let input, input_val, filter, a, i, txtValue;
  // input 태그에 검색어가 없을 경우
  input_val = document.getElementById("input_title").value;
  if (input_val === "") {
    alert("검색어를 입력해 주세요");
  }
  input = document.getElementById("input_title");
  filter = input.value.toUpperCase();
  movieList = document.getElementById("movie_list");
  div = movieList.getElementsByTagName("div");
  let arr = [];
  for (i = 0; i < div.length; i++) {
    a = div[i].getElementsByTagName("h3")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
    arr.push(txtValue.toUpperCase().indexOf(filter));
  }


  //검색 후 영화 정보가 없을 시 이벤트(reduce)
  const sum = arr.reduce((a, b) => a + b);
  const h1 = document.getElementById("h1_tag");
  const img = document.getElementById("img_div");
  if (sum === -20) {
    h1.style.display = "block";
    img.style.display = "block";
  } else {
    h1.style.display = "none";
    img.style.display = "none";
  }
}
// 예고편 비디오 기능
function video_fullscreen() {
  document.getElementById("video_obj").requestFullscreen();
}
