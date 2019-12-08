import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static junit.framework.TestCase.*;


public class BasicTest extends TestHelper {
    /*
    @Test
    public void testSaveNewsAPIKey() throws Exception {
        driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[1]")).click();
        WebElement newsAPIKeyField = driver.findElement(By.xpath("//*[@id=\"APIKey\"]"));
        WebElement saveNewsButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-news-admin/div/form[1]/div/button/span"));
        newsAPIKeyField.sendKeys("1caa9311609c76a5b73acf464655a43c");
        saveNewsButton.click();
        waitForPageLoaded();
        WebElement getSourceList = driver.findElement(By.xpath("//*[@id=\"news-source\"]"));

        WebElement saveSourcesButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-news-admin/div/form[2]/div[2]/button/span"));
        saveSourcesButton.click();
        WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[6]/div"));
        informationScreenButton.click();
        waitForPageLoaded();
        Class getClass = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[3]/div/app-news/mat-carousel/div/ul/li[1]/div")).getClass();
        assertEquals("carousel-slide ng-star-inserted", getClass);
    }
     */

  @Test
  public void testSaveWeatherKey() throws Exception {
    driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[2]")).click();
    WebElement weatherAPIKeyField = driver.findElement(By.xpath("//*[@id=\"APIKey\"]"));
    weatherAPIKeyField.click();
    weatherAPIKeyField.sendKeys("1caa9311609c76a5b73acf464655a43c");
    WebElement saveKeyButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-weather-admin/div/form[1]/div/button"));
    saveKeyButton.click();
    WebElement weatherCityField = driver.findElement(By.xpath("//*[@id=\"city\"]"));
    weatherCityField.click();
    weatherCityField.sendKeys("Tartu");
    WebElement saveCityButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-weather-admin/div/form[2]/div/button"));
    saveCityButton.click();
    WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[4]/div"));
    informationScreenButton.click();
    waitForPageLoaded();
    String imgSrc = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[1]/div[2]/app-weather/html/body/div[1]/div[2]/div/img")).getAttribute("src");
    assertEquals("http://openweathermap.org/img/wn/10n@2x.png", imgSrc);
  }

  //negative test case
  @Test
  public void testSaveEmptyWeatherKey() throws Exception {
    driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[2]")).click();
    WebElement weatherAPIKeyField = driver.findElement(By.xpath("//*[@id=\"APIKey\"]"));
    weatherAPIKeyField.click();
    weatherAPIKeyField.sendKeys("");
    WebElement saveKeyButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-weather-admin/div/form[1]/div/button"));
    saveKeyButton.click();
    WebElement weatherCityField = driver.findElement(By.xpath("//*[@id=\"city\"]"));
    weatherCityField.click();
    weatherCityField.sendKeys("Tartu");
    WebElement saveCityButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-weather-admin/div/form[2]/div/button"));
    saveCityButton.click();
    WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[4]/div"));
    informationScreenButton.click();
    waitForPageLoaded();
    String imgSrc = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[1]/div[2]/app-weather/html/body/div[1]/div[2]/div/img")).getAttribute("src");
    assertEquals("http://openweathermap.org/img/wn/10n@2x.png", imgSrc);
  }

  /*
  Tests whether after giving youtube link input the youtube video will actually be present
  by checking whether the play button is present or not
   */
  @Test
  public void testSaveVideoLink() throws Exception {
    driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[3]")).click();
    WebElement videoLocationField = driver.findElement(By.xpath("//*[@id=\"videoLocation\"]"));
    videoLocationField.click();
    videoLocationField.sendKeys("https://www.youtube.com/watch?v=Fdf5aTYRW0E&t=1534s");
    WebElement saveVideoButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-video-admin/div/form/div/button/span"));
    saveVideoButton.click();
    WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[4]/div"));
    informationScreenButton.click();
    WebElement video = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[2]/div[1]/app-video-feed/div/div/iframe"));
    waitForPageLoaded();
    driver.switchTo().frame(driver.findElement(By.xpath("//iframe[contains(@src,'https://www.youtube.com')]")));
    waitForPageLoaded();
    Boolean isPresent = driver.findElements(By.xpath("//button[@aria-label=\"Play\"]")).size() > 0;
    assertTrue(isPresent);
  }

  //negative test case
  @Test
  public void testSaveEmptyVideoLink() throws Exception {
    driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[3]")).click();
    WebElement videoLocationField = driver.findElement(By.xpath("//*[@id=\"videoLocation\"]"));
    videoLocationField.click();
    videoLocationField.sendKeys("");
    WebElement saveVideoButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-video-admin/div/form/div/button/span"));
    saveVideoButton.click();
    WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[4]/div"));
    informationScreenButton.click();
    WebElement video = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[2]/div[1]/app-video-feed/div/div/iframe"));
    waitForPageLoaded();
    driver.switchTo().frame(driver.findElement(By.xpath("//iframe[contains(@src,'https://www.youtube.com')]")));
    waitForPageLoaded();
    Boolean isPresent = driver.findElements(By.xpath("//button[@aria-label=\"Play\"]")).size() > 0;
    assertTrue(isPresent);
  }

  @Test
  public void testPlayVideo() throws Exception {
    driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[3]")).click();
    WebElement videoLocationField = driver.findElement(By.xpath("//*[@id=\"videoLocation\"]"));
    videoLocationField.click();
    videoLocationField.sendKeys("https://www.youtube.com/watch?v=Fdf5aTYRW0E&t=1534s");
    WebElement saveVideoButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav-content/app-video-admin/div/form/div/button/span"));
    saveVideoButton.click();
    WebElement informationScreenButton = driver.findElement(By.xpath("/html/body/app-root/app-admin-screen/app-sidenav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[4]/div"));
    informationScreenButton.click();
    WebElement video = driver.findElement(By.xpath("/html/body/app-root/app-data-feeds/body/div[2]/div[1]/app-video-feed/div/div/iframe"));
    waitForPageLoaded();
    driver.switchTo().frame(driver.findElement(By.xpath("//iframe[contains(@src,'https://www.youtube.com')]")));
    waitForPageLoaded();
    Boolean isPresent = driver.findElements(By.xpath("//button[@aria-label=\"Play\"]")).size() > 0;
    waitForPageLoaded();
    driver.findElement(By.xpath("//button[@aria-label=\"Play\"]")).click();
    assertTrue(!driver.findElement(By.xpath("//button[@aria-label=\"Play\"]")).isDisplayed());
  }

}
