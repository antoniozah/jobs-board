const jobsDOM = document.querySelector('.jobs__center');


//getting the jobs
class Jobs{
  async getJobs(){
    try {
      let result = await fetch('jobs.json');
      let data = await result.json();
      let jobs = data.jobs_item;
      return jobs;
    } catch (error) {
      console.log('ohhhh, error', error);
    }
  }
}

//display jobs
class JobUI{
  displayJobs(jobs){
    let result = '';
    jobs.forEach(job => {
      result += `
        <!-- single job -->
          <article class="job">
            <div class="job__info">
              <div class="job__title">${job.title}</div>
              <div class="job__meta">
                ${job.type} - ${job.location}
              </div>
              <div class="job__description">${job.description.slice(0, 600) + '...'}</div>
              <button class="job__open" data-id=${job.id}>Open this Job</button>
            </div>
          </article>
      `;
    });
    jobsDOM.innerHTML = result;
  }
}

//local storage
class Storage{

}

document.addEventListener("DOMContentLoaded", () =>{
  const jobui = new JobUI()
  const jobs = new Jobs();

  //get all jobs
  jobs.getJobs().then(jobs => jobui.displayJobs(jobs));
});