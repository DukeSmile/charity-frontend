import { Grid } from "@material-ui/core"

export const FooterTab = () => {

  const menuStyle = 'text-gunsmoke text-16 my-5 hover:text-white cursor-pointer';
  const subMenus1 = [
    'Medical',
    'Emergency',
    'Memorial',
    'Education',
    'Nonprofit',
    'Crisis Relief'
  ];
  const subMenus2 = [
    'How GoFundMe Works',
    'Why GoFundMe',
    'Common questions',
    'Success stories',
    'Supported countries',
    'Charity fundraising',
    'Pricing',
  ];
  const subMenus3 = [
    'Donate',
    'Fundraise',
    'Volunteer',
    'Find Other Ways To Give',
    'Start A Group Volunteer',
  ];
  return (
    <div className="bg-dark">
      <div className="w-[95%] md:w-[80%] mx-auto py-40 flex items-center justify-between flex-wrap px-20">
        <div className="text-white max-w-270 mr-50 my-20">
          <p className="text-40 font-bold">Okapi</p>
          <p className="text-16 my-10">Thanks to the help of our generous supporters, ACE has been working</p>
          <p className="text-20 font-bold my-10">Follow us</p>
        </div>
        <Grid container spacing={1} className="max-w-700">
          <Grid item xs={12} sm={6} md={4}>
            <p className="text-white text-22 font-bold">Fundraise for</p>
            {
              subMenus1.map((menu, index) => {
                return (
                  <p key={index} className={menuStyle}>
                    {menu}
                  </p>
                )
              })
            }
          </Grid>
          <Grid item xs={12} sm={6}  md={4}>
            <p className="text-white text-22 font-bold">Learn more</p>
            {
              subMenus2.map((menu, index) => {
                return (
                  <p key={index} className={menuStyle}>
                    {menu}
                  </p>
                )
              })
            }
          </Grid>
          <Grid item xs={12} md={4}>
            <p className="text-white text-22 font-bold">Ways to give</p>
            {
              subMenus3.map((menu, index) => {
                return (
                  <p key={index} className={menuStyle}>
                    {menu}
                  </p>
                )
              })
            }
          </Grid>
        </Grid>
      </div>
    </div>
  )
}