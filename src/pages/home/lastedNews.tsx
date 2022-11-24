import { Grid } from "@material-ui/core"
import { FaMedium, FaTwitter } from "react-icons/fa"

export const LatestNews = () =>  {
  return (
    <div className="w-[95%] md:w-[80%] mx-auto pb-100">
      <div className="text-38 font-bold flex justify-between">
        <label>Latest News</label>
      </div>
      <div className="my-40">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <div className="text-32 font-bold flex justify-center">
              <a href="https://charurl" target="blank" className="flex items-center"><FaTwitter className="mr-20"/> Go to Chart</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="text-32 font-bold flex justify-center">
              <a href="https://twitter.com/okapi_eth" target="blank" className="flex items-center"><FaTwitter className="mr-20"/> Go to Twitter</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="text-32 font-bold flex justify-center">
              <a href="https://charurl" target="blank" className="flex items-center"><FaMedium className="mr-20"/> Go to Medium</a>
            </div>
          </Grid>
        </Grid> 
      </div>
    </div>
  )
}