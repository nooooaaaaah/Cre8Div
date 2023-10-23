using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
namespace Cre8Div;

public class CanvasJsInterop : IAsyncDisposable
{
    private readonly IJSRuntime _jsRuntime;
    private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

    public CanvasJsInterop(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
        _moduleTask = new Lazy<Task<IJSObjectReference>>(() => _jsRuntime.InvokeAsync<IJSObjectReference>(
            "import", "./_content/Cre8Div/canvasJsInterop.js").AsTask());
    }

    public ValueTask AddDraggable(ElementReference element)
    {
        return _moduleTask.Value.ContinueWith(task => task.Result.InvokeVoidAsync("canvasInterop.addDraggable", element)).Result;
    }

    public ValueTask AddResizable(ElementReference element)
    {
        return _moduleTask.Value.ContinueWith(task => task.Result.InvokeVoidAsync("canvasInterop.addResizable", element)).Result;
    }

    public async ValueTask DisposeAsync()
    {
        if (_moduleTask.IsValueCreated)
        {
            var module = await _moduleTask.Value;
            await module.DisposeAsync();
        }
    }
}