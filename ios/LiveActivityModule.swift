import SwiftUI
import Combine
import ActivityKit

@available(iOS 16.2, *)
@objc(LiveActivity)
final class LiveActivityModule: NSObject {
  @Published var num: Int = 0
  private var cancellable: Set<AnyCancellable> = Set()
  private var activity: Activity<MessLiveActivityAttributes>?

  @objc(startActivity)
  func startActivity() {
    // 앱이 live activity사용 가능한지여부
    guard ActivityAuthorizationInfo().areActivitiesEnabled else { return }
    let liveActAttributes = MessLiveActivityAttributes(name: "test")
    // stateful한 값
    let liveActContentState = MessLiveActivityAttributes.ContentState(value: 0)
    
    do {
      self.activity = try Activity.request(attributes: liveActAttributes, contentState: liveActContentState)
      timer()
      getData()
    } catch {
      print("Error")
    }
  }

  @objc(endActivity)
  func endActivity() {
    Task {
      await activity?.end(using: nil, dismissalPolicy: .default)
      cancellable.removeAll()
      num = 0
    }
  }
  
  func timer() {
    Timer.publish(every: 1, on: .main, in: .default)
      .autoconnect()
      .sink { [self] _ in
        num += 1
        Task {
          let newState = MessLiveActivityAttributes.ContentState(value: num)
          let alertConfiguration = AlertConfiguration(
            title: "timer update",
            body: "현재숫자: \(num)",
            sound: .default
          )
          await activity?.update(using: newState)
          if num == 100 {
            await activity?.end(using: nil, dismissalPolicy: .default)
            cancellable.removeAll()
            num = 0
          }
        }
      }
      .store(in: &cancellable)
  }
  
  func getData() {
    let session = URLSession.shared
    let url = URL(string: "https://api.github.com/search/repositories?q=topic:reactjs&per_page=15&page=1")
    var request = URLRequest(url: url!)
    request.httpMethod = "GET"
    let task = session.dataTask(with: request) { (data, response, error) in
        if let error = error {
            print("Error: \(error.localizedDescription)")
            return
        }

        guard let data = data else {
            print("No data received")
            return
        }

        do {
            let json = try JSONSerialization.jsonObject(with: data, options: [])
            print(json)
        } catch let error {
            print("Error: \(error.localizedDescription)")
        }
    }
    task.resume()
  }
}
