# GSAPP Skill Trails

This is Version 3 of the GSAPP Skill Tree, now called GSAPP Skill Trails. 

UNDER DEVELOPMENT!

## Project setup

Install:
- `npm install`
Development:
- `npm run serve`

## Deployment

### Staging

#### Github Pages
- run `deploy-staging.sh`
- Staging at https://dantaeyoung.github.io/GSAPPSkillTree/

#### Netlify
- `git checkout staging`
- `git merge master`
- `git push columbiagsapp staging`
  - (If you've cloned the `/columbiaGSAPP` repo, then it probably looks like `git push master staging`


### Production

- Hosted via Netlify on https://gsappskilltrails.netlify.app/ from `https://github.com/columbiagsapp/GSAPPSkillTrails` repo.
- Production branch is `production` on `https://github.com/columbiagsapp/GSAPPSkillTrails` repo.

To setup production repo: `remote add columbiagsapp https://github.com/columbiagsapp/GSAPPSkillTrails.git` 

To deploy to production:
- `git checkout production`
- `git merge master`
- `git push columbiagsapp production`
  - (If you've cloned the `/columbiaGSAPP` repo, then it probably looks like `git push master production`
